import { newE2EPage } from '@stencil/core/testing';

describe('date-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<date-item></date-item>');

    const element = await page.find('date-item');
    expect(element).toHaveClass('hydrated');
  });
});
