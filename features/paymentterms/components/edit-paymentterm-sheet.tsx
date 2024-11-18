import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useDeletePaymentterm } from '@/features/paymentterms/api/use-delete-paymentterm';
import { useEditPaymentterm } from '@/features/paymentterms/api/use-edit-paymentterm';
import { useGetPaymentterm } from '@/features/paymentterms/api/use-get-paymentterm';
import { PaymenttermForm } from '@/features/paymentterms/components/paymentterm-form';
import { useOpenPaymentterm } from '@/features/paymentterms/hooks/use-open-paymentterm';
import { useGetFacilities } from '@/features/facilities/api/use-get-facilities';
import { useGetProducts } from '@/features/products/api/use-get-products';
import { useGetPeriods } from '@/features/periods/api/use-get-periods';

import { useConfirm } from '@/hooks/use-confirm';

// Define the paymentterm schema
const paymenttermSchema = z.object({
  sellerId: z.number(),
  buyerId: z.number(),
  productId: z.number(),
  defermentPeriod: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  timeUnit: z.string(),
  downPaymentRatio: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : undefined)),
  timePeriodId: z.number()
});

type FormValues = z.infer<typeof paymenttermSchema>;

export const EditPaymenttermSheet = () => {
  const { isOpen, onClose, id } = useOpenPaymentterm();

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this paymentterm.'
  );

  const paymenttermQuery = useGetPaymentterm(id);
  const editMutation = useEditPaymentterm(id);
  const deleteMutation = useDeletePaymentterm(id);

  const facilityQuery = useGetFacilities();
  const productQuery = useGetProducts();
  const periodQuery = useGetPeriods();

  const facilityOptions = (facilityQuery.data ?? []).map((facility) => ({
    label: facility.name,
    value: facility.id
  }));
  const productOptions = (productQuery.data ?? []).map((product) => ({
    label: product.name,
    value: product.id
  }));
  const periodOptions = (periodQuery.data ?? []).map((period) => ({
    label: period.name,
    value: period.id
  }));
  const isPending =
    editMutation.isPending || deleteMutation.isPending || paymenttermQuery.isLoading;

  const isLoading = paymenttermQuery.isLoading || facilityQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  const defaultValues = paymenttermQuery.data
    ? {
        sellerId: paymenttermQuery.data.sellerId,
        buyerId: paymenttermQuery.data.buyerId,
        productId: paymenttermQuery.data.productId,
        defermentPeriod: paymenttermQuery.data.defermentPeriod,
        timeUnit: paymenttermQuery.data.timeUnit,
        downPaymentRatio: paymenttermQuery.data.downPaymentRatio,
        timePeriodId: paymenttermQuery.data.timePeriodId
      }
    : {
        sellerId: 0,
        buyerId: 0,
        productId: 0,
        defermentPeriod: 0,
        timeUnit: '',
        downPaymentRatio: 0,
        timePeriodId: 0
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4 bg-white">
          <SheetHeader>
            <SheetTitle>Edit Paymentterm</SheetTitle>
            <SheetDescription>Edit an existing paymentterm</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <PaymenttermForm
              id={Number(id) || undefined}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              facilityOptions={facilityOptions}
              productOptions={productOptions}
              periodOptions={periodOptions}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
