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
    await t.maximizeWindow();

    const acceptButtonExists = await acceptButton.exists;

    if (acceptButtonExists) {
        await t.click(acceptButton);
    }

    const searchLabelExists = await searchLabel.exists;
    const searchLabelVisible = await searchLabel.visible;

    if (searchLabelExists && searchLabelVisible) {
        await t.click(searchLabel);
    }

    await t.expect(searchInput.visible).ok();
    await t.click(searchInput);
    await t.typeText(searchInput, "```")

    const searchResultItemExists = await searchResultItem.exists;
    await t.expect(searchResultItemExists).notOk('Invalid yamls exist, failing the test');
})