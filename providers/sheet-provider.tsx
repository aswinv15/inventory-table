"use client";

import { useMountedState } from "react-use";

import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { EditCustomerSheet } from "@/features/customers/components/edit-customer-sheet";
import { NewCustomerSheet } from "@/features/customers/components/new-customer-sheet";
import { EditDemandSheet } from "@/features/demands/components/edit-demand-sheet";
import { NewDemandSheet } from "@/features/demands/components/new-demand-sheet";
import { EditFacilitySheet } from "@/features/facilities/components/edit-facility-sheet";
import { NewFacilitySheet } from "@/features/facilities/components/new-facility-sheet";
import { EditGroupSheet } from "@/features/groups/components/edit-group-sheet";
import { NewGroupSheet } from "@/features/groups/components/new-group-sheet";
import { EditLocationSheet } from "@/features/locations/components/edit-location-sheet";
import { NewLocationSheet } from "@/features/locations/components/new-location-sheet";
import { EditPeriodSheet } from "@/features/periods/components/edit-period-sheet";
import { NewPeriodSheet } from "@/features/periods/components/new-period-sheet";
import { EditProductSheet } from "@/features/products/components/edit-product-sheet";
import { NewProductSheet } from "@/features/products/components/new-product-sheet";
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { EditUnitSheet } from "@/features/units/components/edit-unit-sheet";
import { NewUnitSheet } from "@/features/units/components/new-unit-sheet";
import { EditvehicleTypeSheet } from '@/features/vehicleTypes/components/edit-vehicleType-sheet';
import { NewvehicleTypeSheet } from '@/features/vehicleTypes/components/new-vehicleType-sheet';
import { NewAssetsconstraintSheet } from '@/features/assetsconstraints/components/new-assetsconstraint-sheet';
import { EditAssetsconstraintSheet } from '@/features/assetsconstraints/components/edit-assetsconstraint-sheet';
import { NewcustomconstraintSheet } from "@/features/customconstraints/components/new-customconstraint-sheet";
import { EditcustomconstraintSheet } from "@/features/customconstraints/components/edit-customconstraint-sheet";
import { NewLinearrangeSheet } from '@/features/linearranges/components/new-linearrange-sheet';
import { EditLinearrangeSheet } from "@/features/linearranges/components/edit-linearrange-sheet";
import { NewDistancebydemandSheet } from "@/features/distancebydemands/components/new-distancebydemand-sheet";
import { EditDistancebydemandSheet } from "@/features/distancebydemands/components/edit-distancebydemand-sheet";
import { NewIndicatorconstraintSheet } from "@/features/indicatorconstraints/components/new-indicatorconstraint-sheet";
import { EditIndicatorconstraintSheet } from "@/features/indicatorconstraints/components/edit-indicatorconstraint-sheet";
import { NewobjectivememberSheet } from '@/features/objectivemembers/components/new-objectivemember-sheet';
import { EditobjectivememberSheet } from "@/features/objectivemembers/components/edit-objectivemember-sheet";
import { NewProcessingcostSheet } from "@/features/processingcost/components/new-processingcost-sheet";
import { EditProcessingcostSheet } from "@/features/processingcost/components/edit-processingcost-sheet";
import { NewProductstorageSheet } from "@/features/productstorages/components/new-productstorage-sheet";
import { EditProductstorageSheet } from "@/features/productstorages/components/edit-productstorage-sheet";
import { NewSitestatechangeSheet } from "@/features/sitestatechanges/components/new-sitestatechange-sheet";
import { EditSitestatechangeSheet } from "@/features/sitestatechanges/components/edit-sitestatechange-sheet";
import { NewProduction_noSheet } from "@/features/production_no/components/new-production_no-sheet";
import { EditProduction_noSheet } from "@/features/production_no/components/edit-production_no-sheet";
import { NewPeriodgroupSheet } from "@/features/periodgroups/components/new-periodgroup-sheet";
import { EditPeriodgroupSheet } from "@/features/periodgroups/components/edit-periodgroup-sheet";
import { NewProductgroupSheet } from "@/features/productgroups/components/new-productgroup-sheet";
import { EditProductgroupSheet } from "@/features/productgroups/components/edit-productgroup-sheet";
import { NewMilkrunSheet } from "@/features/milkruns/components/new-milkrun-sheet";
import { EditMilkrunSheet } from "@/features/milkruns/components/edit-milkrun-sheet";
import { NewFleetSheet } from "@/features/fleets/components/new-fleet-sheet";
import { EditFleetSheet } from "@/features/fleets/components/edit-fleet-sheet";
import { NewProcessingtimeSheet } from "@/features/processingtime/components/new-processingtime-sheet";
import { EditProcessingtimeSheet } from "@/features/processingtime/components/edit-processingtime-sheet";
import { NewLoadingunloadinggateSheet } from "@/features/loadingunloadinggates/components/new-loadingunloadinggate-sheet";
import { EditLoadingunloadinggateSheet } from "@/features/loadingunloadinggates/components/edit-loadingunloadinggate-sheet";
import { NewOrderingruleSheet } from "@/features/orderingrules/components/new-orderingrule-sheet";
import { EditOrderingruleSheet } from "@/features/orderingrules/components/edit-orderingrule-sheet";
import { NewShippingSheet } from "@/features/shipping/components/new-shipping-sheet";
import { EditShippingSheet } from "@/features/shipping/components/edit-shipping-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
      <EditTransactionSheet />


      <NewCustomerSheet />
      <EditCustomerSheet />


      <NewDistancebydemandSheet />
      <EditDistancebydemandSheet />

      <NewLocationSheet />
      <EditLocationSheet />

      <NewProductSheet />
      <EditProductSheet />

      <NewGroupSheet />
      <EditGroupSheet />

      <NewUnitSheet />
      <EditUnitSheet />

      <NewFacilitySheet />
      <EditFacilitySheet />

      <NewDemandSheet />
      <EditDemandSheet />

      <NewPeriodSheet />
      <EditPeriodSheet />

      <NewvehicleTypeSheet />
        <EditvehicleTypeSheet />

      <NewAssetsconstraintSheet />
      <EditAssetsconstraintSheet />

      <NewcustomconstraintSheet/>
      <EditcustomconstraintSheet />

      <NewLinearrangeSheet />
      <EditLinearrangeSheet />

      <NewIndicatorconstraintSheet />
      <EditIndicatorconstraintSheet />

      <NewobjectivememberSheet />
      <EditobjectivememberSheet />

      <NewProcessingcostSheet />
      <EditProcessingcostSheet />

      <NewProductstorageSheet />
      <EditProductstorageSheet />

      <NewSitestatechangeSheet />
      <EditSitestatechangeSheet />

      <NewProduction_noSheet />
      <EditProduction_noSheet />

      <NewPeriodgroupSheet />
      <EditPeriodgroupSheet />

      <NewProductgroupSheet />
      <EditProductgroupSheet />

      <NewMilkrunSheet />
      <EditMilkrunSheet />

      <NewFleetSheet />
      <EditFleetSheet />

      <NewProcessingtimeSheet />
      <EditProcessingtimeSheet />

      <NewLoadingunloadinggateSheet />
      <EditLoadingunloadinggateSheet />

      <NewOrderingruleSheet />
      <EditOrderingruleSheet />

      <NewShippingSheet />
      <EditShippingSheet />
    </>
  );
};
