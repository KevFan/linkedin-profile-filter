import test from "tape-promise/tape";
import { JSDOM } from "jsdom";
import { RecruiterProfilePageScrape, RecruiterSearchOrPipelinePageScrape } from "./page-scraper";

const goodDoc = new JSDOM(`<!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <div id="profile-container">
        <span data-test-row-lockup-full-name>
        Test User
        </span>
        <div data-test-row-lockup-location>
        United States
        </div>
        <div class="position-item" data-test-group-position-list-container>
          <h2 class="searchable">Software Engineer</h2>
          <a class="position-item__company-link" data-test-position-entity-company-link>Company 1</a>
          <span data-test-position-entity-date-range>2018 - Present</h2>
        </div>
      </div>
    </body>
  </html>`).window.document;

const searchMultipleCurrentPositionsDoc = new JSDOM(
`
<div id="ember2762" class="standard-profile-row ember-view">
    <article id="ember2763" class="row ember-view">
      <div class="row__top-section">
          <div class="row__card">
            <div class="row__top-card">
                <section id="ember2764" class="lockup ember-view">
                  <div id="ember2765" class="artdeco-entity-lockup artdeco-entity-lockup--size-5 ember-view">
                      <div id="ember2768" class="artdeco-entity-lockup__content lockup__content ember-view">
                        <span class="lockup__content-title">
                            <span data-test-row-lockup-full-name="" data-live-test-row-lockup-full-name="">
                              <div id="ember2769" class="artdeco-entity-lockup__title ember-view">
                                  Test User
                                  </a>
                              </div>
                            </span>
                        </span>
                        <div id="ember2775" class="artdeco-entity-lockup__subtitle ember-view">        <span data-test-row-lockup-headline="" data-live-test-row-lockup-headline="">
                            Recruiter at <em class="sh">Company 1</em>
                            </span>
                        </div>
                        <!---->
                        <div id="ember2776" class="artdeco-entity-lockup__metadata ember-view">
                            <div data-test-row-lockup-location="" data-live-test-row-lockup-location="">
                              Ireland
                            </div>
                            <span data-test-current-employer-industry="" data-live-test-current-employer-industry="">
                            Information Technology and Services
                            </span>
                            <!---->      <!---->
                            <span id="ember2777" class="row-lockup-details ember-view">
                              <!---->
                              <!----><!---->
                            </span>
                        </div>
                      </div>
                  </div>
                </section>
            </div>
            <!---->            
            <div class="expandable-list" data-test-expandable-list="">
                <ol class="history-group__list-items">
                  <li data-test-description-description="" class="t-14 t-black t-normal">
                      <!---->
                      <span>Senior Recruiter  at <em class="sh">Company 1</em></span>
                      <span aria-hidden="true">·</span>
                      <span class="description-entry__date-duration" data-test-description-entry-date-duration="">
                      <time>2019</time> – Present
                      </span>
                      <!---->
                      <!---->
                  </li>
                  <li data-test-description-description="" class="t-14 t-black t-normal">
                      <!---->
                      <span>Recruiter at <em class="sh">Company 2</em></span>
                      <span aria-hidden="true">·</span>
                      <span class="description-entry__date-duration" data-test-description-entry-date-duration="">
                      <time>2018</time> – Present
                      </span>
                      <!---->
                      <!---->
                  </li>
                  <li data-test-description-description="" class="t-14 t-black t-normal">
                      <!---->
                      <span> Associate Recruiter at <em class="sh">Company 3</em></span>
                      <span aria-hidden="true">·</span>
                      <span class="description-entry__date-duration" data-test-description-entry-date-duration="">
                      <time>2013</time> – <time>2015</time>
                      </span>
                      <!---->
                      <!---->
                  </li>
                </ol>
                <!---->    
            </div>
          </div>
      </div>
    </article>
</div>
`).window.document;

// Tests for RecruiterProfilePageScrape
test("RecruiterProfilePageScrape - ensure recruiter profile scraper retrieves primary data if available", async (t) => {
  const scrape = new RecruiterProfilePageScrape(goodDoc);

  t.equals(scrape.name, "Test User");
  t.equals(scrape.company[0], "Company 1");
  t.equals(scrape.location, "united states");
});

// Tests for RecruiterSearchOrPipelinePageScrape
test("RecruiterSearchOrPipelinePageScrape - ensure recruiter search scraper retrieves primary data if available", async (t) => {
  const scrape = new RecruiterSearchOrPipelinePageScrape(searchMultipleCurrentPositionsDoc);
  
  t.equals(scrape.name, "Test User");
  t.equals(scrape.company.length, 2);
  t.equals(scrape.company[0], "Company 1");
  t.equals(scrape.company[1], "Company 2");
  t.equals(scrape.location, "ireland");
});

