import { Loader2 } from 'lucide-react';
import { z } from 'zod';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useCreateVehicleselection } from '@/features/vehicleselections/api/use-create-vehicleselection';
import { VehicleselectionForm } from '@/features/vehicleselections/components/vehicleselection-form';
import { useNewVehicleselection } from '@/features/vehicleselections/hooks/use-new-vehicleselection';
import { useGetProducts } from '@/features/products/api/use-get-products';
import { useGetFacilities } from '@/features/facilities/api/use-get-facilities';
// Assuming you have a schema for vehicleselection, replace this with the actual schema
const vehicleselectionSchema = z.object({
  fromId: z.number().optional(),
  toId: z.number().optional(),
  type: z.string().optional()
});

type FormValues = z.infer<typeof vehicleselectionSchema>;

export const NewVehicleselectionSheet = () => {
  const { isOpen, onClose } = useNewVehicleselection();
  const createMutation = useCreateVehicleselection();

  const facilityQuery = useGetFacilities();
  const facilityMutation = { isPending: false };

  const facilityOptions = (facilityQuery.data ?? []).map((facility) => ({
    label: facility.name,
    value: facility.id
  }));

  const isPending = createMutation.isPending || facilityMutation.isPending;
  const isLoading = facilityQuery.isLoading;

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
          <SheetTitle>New Vehicle Selection</SheetTitle>
          <SheetDescription>Add a New Vehicle Selection</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center ">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <VehicleselectionForm 
           onSubmit={onSubmit}
           disabled={isPending} 
           facilityOptions={facilityOptions} />
        )}
      </SheetContent>
    </Sheet>
  );
};
