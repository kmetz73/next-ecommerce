import { generateAccessToken, paypal } from '../lib/paypal';

// Test to generate access token from paypal
test('generates token from paypal', async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);
  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// test to create a paypal order
test('creates a paypal order', async () => {
  const token = await generateAccessToken();
  const price = 10.0;

  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  expect(orderResponse).toHaveProperty('id');
  expect(orderResponse).toHaveProperty('status');
  expect(orderResponse.status).toBe('CREATED');
});

// test to capture a paypal payment with a mock order
test('captures a paypal payment from a order', async () => {
  const orderId = '100';

  const mockCapturePayment = jest
    .spyOn(paypal, 'capturePayment')
    .mockResolvedValue({
      status: 'COMPLETED',
    });

  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty('status', 'COMPLETED');

  mockCapturePayment.mockRestore();
});
