import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useCreateInventory } from '@/features/inventorys/api/use-create-inventory';
import { InventoryForm } from '@/features/inventorys/components/inventory-form';
import { useNewInventory } from '@/features/inventorys/hooks/use-new-inventory';
import { useGetFacilities } from '@/features/facilities/api/use-get-facilities';
import { useGetProducts } from '@/features/products/api/use-get-products';
import { useGetPeriods } from '@/features/periods/api/use-get-periods';
// Assuming you have a schema for inventory, replace this with the actual schema
const inventorySchema = z.object({
  facilityId: z.number().optional(),
  productId: z.number().optional(),
  policyType: z.string().optional(),
  initialStock: z.string().optional(),
  periodicCheck: z.boolean().optional(),
  period: z.number().optional(),
  firstPeriodicCheck: z.string().optional(),
  policyBasis: z.string().optional(),
  stockCalculationWindow: z.number().optional(),
  timeUnit: z.string().optional(),
  minSplitRatio: z.number().optional(),
  timePeriodId: z.number().int().optional(),
  inclusionType: z.string().optional()
});

type FormValues = z.infer<typeof inventorySchema>;

export const NewInventorySheet = () => {
  const { isOpen, onClose } = useNewInventory();
  const createMutation = useCreateInventory();

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

  const isPending = createMutation.isPending;
  const isLoading = facilityQuery.isLoading || productQuery.isLoading || periodQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 bg-white">
        <SheetHeader>
          <SheetTitle>New Inventory</SheetTitle>
          <SheetDescription>Add a new inventory</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center ">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <InventoryForm
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
