// @ts-check
import { test, expect } from '@playwright/test';

test('Initiate New Case Flow with Valid Credentials', async ({ page, context }) => {
  // Step 1: Go to login page
  await page.goto('https://qa-onboardx.authbridge.com/');
  await expect(page).toHaveURL(/.*authbridge\.com/); // ✅ Verify URL loaded

  // Step 2: Enter username and click Continue
  await page.locator('#username').fill('clientjourney.demo@authbridge.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#password')).toBeVisible(); // Password field should be visible

  // Step 3: Enter password with CapsLock simulation
  await page.locator('#password').press('CapsLock');
  await page.locator('#password').fill('A');
  await page.locator('#password').press('CapsLock');
  await page.locator('#password').fill('Auth@123');

  // Step 4: Fill captcha and submit
  await page.getByRole('textbox', { name: 'Captcha' }).fill('12345');
  await page.locator('#submitBtn').click();

  // ✅ Validate login success by checking for hamburger menu
  await expect(page.locator('.hamburger.hamburger--arrow')).toBeVisible();

  // Step 5: Navigate to Initiate Case page
  await page.locator('.hamburger.hamburger--arrow').click();
  await page.getByRole('link', { name: 'Initiate New Case' }).click();
  await page.getByRole('link', { name: 'Initiate Case(s) Individually' }).click();

  // Step 6: Select Package
  await page.getByRole('combobox', { name: '-- Select Package --' }).click();
  await page.getByRole('treeitem', { name: 'Basic' }).click();
  await page.getByRole('link', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Step 7: Fill candidate details
  await page.locator("//label[normalize-space()='Name']").click();
  await page.locator('#first-name').fill('divesh');
  await page.locator('#email-address').fill('divesh.premchandani@authbridge.com');
  await page.locator('#mobile-no').fill('9910832588');

  await page.locator("label[title='Location']").click();
  await page.locator('#location-id').selectOption('4');

  await page.locator("//label[@title='Department']").click();
  await page.locator('#depatment').selectOption('2');

  await page.locator("label[title='Calendar']").click();
  await page.getByRole('link', { name: '8', exact: true }).click();

  await page.locator("#partner-pin-code").fill('201301');
  await page.locator("label[title='City']").click();

  // ✅ Assert basic fields are filled correctly
  await expect(page.locator('#first-name')).toHaveValue('divesh');
  await expect(page.locator('#email-address')).toHaveValue('divesh.premchandani@authbridge.com');
  await expect(page.locator('#mobile-no')).toHaveValue('9910832588');

  // Step 8: Open new tab for Privacy Policy
  const originalPage = page;
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator("a[href='/home/privacy-policy']").click()
  ]);
  await newPage.waitForLoadState();

  // ✅ Click on Introduction in new tab
  await newPage.locator("//a[normalize-space()='Introduction']").click();

  // Switch back to original tab
  await originalPage.bringToFront();

  // Step 9: Scroll up using scrollbar drag
  const scrollbar = await page.locator('#mCSB_2_dragger_vertical');
  const box = await scrollbar.boundingBox();

  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 - 100, { steps: 10 });
    await page.mouse.up();
  }

  await page.waitForTimeout(2000); // wait 2 seconds

  // Step 10: Add candidate
  await page.locator('#addCandidate').dblclick();
  await page.locator("//a[normalize-space()='Ignore Duplicate(s)']").click();

  // Step 11: Continue and initiate
  await page.locator('#continueBtn').click();
  await page.locator('#initiateBtn').click();

  // ✅ Final assertion to ensure success
  await expect(page).toHaveURL(/.*case-initiation|confirmation/);
});


