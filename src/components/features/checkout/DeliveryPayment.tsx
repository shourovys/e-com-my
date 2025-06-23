'use client';

import { Clock, CreditCard } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';

interface DeliveryPaymentProps {
  onContinue: () => void;
  onBack: () => void;
}

const DeliveryPayment: React.FC<DeliveryPaymentProps> = ({
  onContinue,
  onBack,
}) => {
  // For MVP, we only have one delivery option and one payment method
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For MVP, save to localStorage
    localStorage.setItem('deliveryOption', deliveryOption);

    // Move to next step
    setIsLoading(false);
    onContinue();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Delivery Options */}
      <div>
        <h2 className='text-lg font-medium mb-4'>Delivery Options</h2>

        <RadioGroup
          value={deliveryOption}
          onValueChange={setDeliveryOption}
          className='space-y-3'
        >
          <div>
            <Card
              className={`border-2 ${
                deliveryOption === 'standard'
                  ? 'border-primary'
                  : 'border-transparent'
              }`}
            >
              <CardContent className='p-4'>
                <div className='flex items-start'>
                  <RadioGroupItem
                    value='standard'
                    id='standard'
                    className='mt-1'
                  />
                  <div className='ml-3 flex-1'>
                    <Label htmlFor='standard' className='font-medium block'>
                      Standard Delivery
                    </Label>
                    <div className='flex items-center mt-1 text-sm text-muted-foreground'>
                      <Clock className='h-4 w-4 mr-1' />
                      <span>25-40 mins</span>
                    </div>
                    <p className='mt-1 text-sm'>Tk 37</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* For future: add more delivery options like "Express" or "Scheduled" */}
        </RadioGroup>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className='text-lg font-medium mb-4'>Payment Method</h2>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='bg-primary/10 p-2 rounded-md mr-3'>
                  <CreditCard className='h-6 w-6 text-primary' />
                </div>
                <div>
                  <p className='font-medium'>bKash</p>
                  <p className='text-xs text-muted-foreground'>bdhf616q</p>
                </div>
              </div>

              <Button
                variant='outline'
                size='sm'
                disabled
                className='text-xs'
                type='button'
              >
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
        <p className='text-xs text-muted-foreground mt-2'>
          * For MVP, payment method is hardcoded. Integration with real payment
          gateways will be in future releases.
        </p>
      </div>

      {/* Buttons */}
      <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
        <Button
          type='button'
          variant='outline'
          onClick={onBack}
          className='order-2 sm:order-1'
        >
          Back to Address
        </Button>
        <Button
          type='submit'
          disabled={isLoading}
          className='order-1 sm:order-2'
        >
          {isLoading ? 'Processing...' : 'Continue to Review'}
        </Button>
      </div>
    </form>
  );
};

export default DeliveryPayment;
