 // @ts-check
import { test, expect } from '@playwright/test';
import { time } from 'console';
//import { waitForDebugger } from 'inspector';

test('test', async ({ page, context }) => {
  await page.goto('https://qa-onboardx.authbridge.com/');
  await page.locator('#username').fill('clientjourney.demo@authbridge.com');
  //await page.locator('#continueEmail').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#password').press('CapsLock');
  await page.locator('#password').fill('A');
  await page.locator('#password').press('CapsLock');
  await page.locator('#password').fill('Auth@123');
  //await page.getByPlaceholder('Captcha').click();
  await page.getByRole('textbox', { name: 'Captcha' }).click();
  await page.getByRole('textbox', { name: 'Captcha' }).fill('12345');
  await page.locator('#submitBtn').click();
  await page.waitForTimeout(2000); // wait for 2 second
  

  await page.locator('.hamburger.hamburger--arrow').click();
  await page.getByRole('link', { name: 'Initiate New Case' }).click();
  await page.getByRole('link', { name: 'Initiate Case(s) Individually' }).click();
  await page.getByRole('combobox', { name: '-- Select Package --' }).click();
  //await page.getByRole('combobox', { name: '-- Select Package --' }).click();
  await page.getByRole('treeitem', { name: 'Basic' }).click();
  await page.getByRole('link', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator("//label[normalize-space()='Name']").click();
  await page.locator('#first-name').fill('divesh');
  await page.getByText('Email ID*').click();
  await page.locator('#email-address').fill('divesh.premchandani@authbridge.com');
  await page.getByText('Mobile number', { exact: true }).click();
  await page.locator('#mobile-no').fill('9910832588');
  await page.locator("label[title='Location']").click();
  await page.locator ('#location-id').selectOption('4');
  await page.locator("//label[@title='Department']").click();
  await page.locator('#depatment').selectOption('2');
  await page.locator("label[title='Calendar']").click();
  await page.getByRole('link', { name: '8', exact: true }).click();
  await page.locator("label[title='Pincode']").click();
  await page.locator("#partner-pin-code").fill('201301');
  await page.locator("label[title='City']").click();
 
 // Stored original tab (page) or const originalPage = page;	Save the original tab for later use
const originalPage = page;

// Click the button/link that opens a new tab and Wait for new tab and open it via click
const [newPage] = await Promise.all([
  context.waitForEvent('page'), // Waited for new tab or Wait for new tab to fully load
  page.locator("a[href='/home/privacy-policy']").click()
]);

// On the new tab
await newPage.waitForLoadState();

await newPage.locator("//a[normalize-space()='Introduction']").click();

// Switch back to original tab
await originalPage.bringToFront();

const scrollbar = await page.locator('#mCSB_2_dragger_vertical');
const box = await scrollbar.boundingBox();
//await page.waitForTimeout(2000); // wait for 2 second

if (box) {
  // Move mouse to center of scrollbar thumb
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();

  // Drag UP by 100 pixels
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 - 100, { steps: 10 });
  await page.mouse.up();
}
await page.waitForTimeout(2000); // wait for 2 second
await page.locator('#addCandidate').dblclick();
await page.locator("//a[normalize-space()='Ignore Duplicate(s)']").click();
await page.locator("#continueBtn").click();
await page.locator('#initiateBtn').click();
});

function timeout(arg0) {
  throw new Error('Function not implemented.');
}
