import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useCreatePaymentterm } from '@/features/paymentterms/api/use-create-paymentterm';
import { PaymenttermForm } from '@/features/paymentterms/components/paymentterm-form';
import { useNewPaymentterm } from '@/features/paymentterms/hooks/use-new-paymentterm';
import { useGetFacilities } from '@/features/facilities/api/use-get-facilities';
import { useGetProducts } from '@/features/products/api/use-get-products';
import { useGetPeriods } from '@/features/periods/api/use-get-periods';
// Assuming you have a schema for paymentterm, replace this with the actual schema
const paymenttermSchema = z.object({
  sellerId: z.number().int(),
  buyerId: z.number().int(),
  productId: z.number().int(),
  defermentPeriod: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  timeUnit: z.string().min(1, 'Time unit is required'),
  downPaymentRatio: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  timePeriodId: z.number().int().positive('Time period is required')
});

type FormValues = z.infer<typeof paymenttermSchema>;

export const NewPaymenttermSheet = () => {
  const { isOpen, onClose } = useNewPaymentterm();
  const createMutation = useCreatePaymentterm();

  // Placeholder for useLocation hook
  const facilityQuery = useGetFacilities();
  const facilityMutation = { isPending: false }; // Replace with actual mutation
  // const onCreateLocation = (name: string) => {
  //   // Implement location creation logic
  // };
  const facilityOptions = (facilityQuery.data ?? []).map((facility) => ({
    label: facility.name,
    value: facility.id
  }));

   const productQuery = useGetProducts();
   const productMutation = { isPending: false }; // Replace with actual mutation
   // const onCreateLocation = (name: string) => {
   //   // Implement location creation logic
   // };
   const productOptions = (productQuery.data ?? []).map((product) => ({
     label: product.name,
     value: product.id
   }));
  
   const periodQuery = useGetPeriods();
   const periodMutation = { isPending: false }; // Replace with actual mutation
   // const onCreateLocation = (name: string) => {
   //   // Implement location creation logic
   // };
  const periodOptions = (periodQuery.data ?? []).map((period) => ({
    label: period.name,
    value: period.id
  }));

  const isPending = createMutation.isPending;
  const isLoading = facilityQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    const formattedValues = {
      ...values,
      defermentPeriod: values.defermentPeriod ? values.defermentPeriod.toString() : undefined,
      downPaymentRatio: values.downPaymentRatio ? values.downPaymentRatio.toString() : '',
    };
    createMutation.mutate(formattedValues, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 bg-white">
        <SheetHeader>
          <SheetTitle>New Paymentterm</SheetTitle>
          <SheetDescription>Add a new paymentterm</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center ">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <PaymenttermForm
            onSubmit={onSubmit}
            disabled={isPending}
            facilityOptions={facilityOptions}
            productOptions={productOptions}
            periodOptions={periodOptions}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
