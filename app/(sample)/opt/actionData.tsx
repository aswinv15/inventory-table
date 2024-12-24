import WrapperMultiBarChart from "@/app/kendo/charts/bar/WrapperBarChart"
import WrapperWaterfallChart from "@/app/kendo/charts/waterfall/WrapperWaterfallChart";
// import WrapperMap from '~/kendo/map/WrapperMap'
import {
  orderTrendCategories_m,
  orderTrendSeries_m,
  discountproductCategories_m,
  discountproductSeries_m,
  totalExpenseData
} from '@/app/(sample)/optimization/actionAnalysis';


export const reviewTabs = [
  { name: 'Month', href: '#', current: true },
  { name: 'Quarter', href: '#', current: false },
  { name: 'Year', href: '#', current: false },
]

export const meetingTabs = [
  { name: 'Daily', href: '#', current: true },
  { name: 'Weekly', href: '#', current: false },
  
]
export const kpiService_m = [
  {
    Name: 'Current backorders',
    container: <WrapperWaterfallChart data={totalExpenseData} />
  },
 
];

export const kpiInv_m = [
  {
    Name: 'Global Stock',
    container: <WrapperWaterfallChart data={totalExpenseData} />
  },
  {
    Name: 'Current backorders',
    container: <WrapperWaterfallChart data={totalExpenseData} />
  },
  {
    Name: 'Current backorders',
    container: <WrapperWaterfallChart data={totalExpenseData} />
  },
 
];

