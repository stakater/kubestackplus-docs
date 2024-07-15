import { fixture, Selector } from "testcafe";

const consentControlsDiv = Selector('.md-consent__controls');
const acceptButton = consentControlsDiv.find('button').withText('Accept');
const searchInput = Selector('input.md-search__input').withAttribute('placeholder', 'Search');
const searchResultItem = Selector('li.md-search-result__item');
const searchLabel = Selector('label.md-header__button.md-icon').withAttribute('for', '__search');


fixture("Check if yamls are valid")
    .page`${'http://127.0.0.1:8080/saap'}`
    .skipJsErrors();

test(`Accept cookies if cookies consent message is displayed`, async (t) => {
    const acceptButtonExists = await acceptButton.exists;

    if (acceptButtonExists) {
        await t.click(acceptButton);
    }

    // Wait for 5 seconds for search label to become visible
    await t.expect(searchLabel.visible).ok({ timeout: 5000 });
    const searchLabelExists = await searchLabel.exists;
    if (searchLabelExists) {
        await t.click(searchLabel);
    }

    await t.expect(searchInput.visible).ok(); // Wait up to 5 seconds
    await t.click(searchInput);
    await t.typeText(searchInput, "```")
    console.log('Search input clicked and typed on');

    const searchResultItemExists = await searchResultItem.exists;
    await t.expect(searchResultItemExists).notOk('Invalid yamls exist, failing the test');
})
