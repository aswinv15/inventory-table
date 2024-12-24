import WrapperPieChart from  '@/app/kendo/charts/pie/WrapperPieChart'
import WrapperMultiBarChart from '@/app/kendo/charts/bar/WrapperBarChart'
import WrapperMultiStackColChart from '@/app/kendo/charts/stackcol/WrapperStackColChart'
import WrapperWaterfallChart from '@/app/kendo/charts/waterfall/WrapperWaterfallChart'

import {inventoryValuation,costTrendCategories_m,costTrendSeries_m,itemCostCategories_m,itemCostTrendSeries_m} from '@/app/kendo/rawData/analysis/inventoryCostAnalysis'

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
    Name: 'Cost Trend',
    container: <WrapperMultiStackColChart category={costTrendCategories_m} series={costTrendSeries_m} />,
  },
  {
    Name: 'Inventory Valuation by Subinventory',
    container: <WrapperWaterfallChart data={inventoryValuation} />, 

  },
  {
    Name: 'Item Cost - Top 10',
    container: <WrapperMultiBarChart category={itemCostCategories_m} series={itemCostTrendSeries_m} /> ,
    
  },
  {
    Name:'Item Cost by Item Category',
    // container: <WrapperTreeMapChart />,
    container: <WrapperWaterfallChart data={inventoryValuation} />,
  },
]

export const kpiService_q = [
  {
    Name: 'Cost Trend',
    container: <WrapperMultiStackColChart category={costTrendCategories_m} series={costTrendSeries_m} />,
  },
  {
    Name: 'Inventory Valuation by Subinventory',
    container: <WrapperPieChart series={inventoryValuation} />, 

  },
  {
    Name: 'Item Cost - Top 10',
    container: <WrapperMultiBarChart category={itemCostCategories_m} series={itemCostTrendSeries_m} /> ,
    
  },
  {
    Name:'Item Cost by Item Category',
    container: <WrapperPieChart series={inventoryValuation} />,
  },
]

export const kpiService_y = [
  {
    Name: 'Cost Trend',
    container: <WrapperMultiStackColChart category={costTrendCategories_m} series={costTrendSeries_m} />,
  },
  {
    Name: 'Inventory Valuation by Subinventory',
    container: <WrapperPieChart series={inventoryValuation} />, 

  },
  {
    Name: 'Item Cost - Top 10',
    container: <WrapperMultiBarChart category={itemCostCategories_m} series={itemCostTrendSeries_m} /> ,
    
  },
  {
    Name:'Item Cost by Item Category',
    container: <WrapperPieChart series={inventoryValuation} />,
  },
]

export const kpiCost_m = [
  {
    Name: 'Cost Trend',
    container: <WrapperMultiStackColChart category={costTrendCategories_m} series={costTrendSeries_m} />,
  },
  {
    Name: 'Inventory Valuation by Subinventory',
    container: <WrapperPieChart series={inventoryValuation} />, 

  },
  {
    Name: 'Item Cost - Top 10',
    container: <WrapperMultiBarChart category={itemCostCategories_m} series={itemCostTrendSeries_m} /> ,
    
  },
  {
    Name:'Item Cost by Item Category',
    container: <WrapperPieChart series={inventoryValuation} />,
  },

]

export const kpiCost_q = [
  {
    Name: 'Cost Trend',
    container: <WrapperMultiStackColChart category={costTrendCategories_m} series={costTrendSeries_m} />,
  },
  {
    Name: 'Inventory Valuation by Subinventory',
    container: <WrapperPieChart series={inventoryValuation} />, 

  },
  {
    Name: 'Item Cost - Top 10',
    container: <WrapperMultiBarChart category={itemCostCategories_m} series={itemCostTrendSeries_m} /> ,
    
  },
  {
    Name:'Item Cost by Item Category',
    container: <WrapperPieChart series={inventoryValuation} />,
  },
]

export const kpiCost_y = [
  {
    Name: 'Cost Trend',
    container: <WrapperMultiStackColChart category={costTrendCategories_m} series={costTrendSeries_m} />,
  },
  {
    Name: 'Inventory Valuation by Subinventory',
    container: <WrapperPieChart series={inventoryValuation} />, 

  },
  {
    Name: 'Item Cost - Top 10',
    container: <WrapperMultiBarChart category={itemCostCategories_m} series={itemCostTrendSeries_m} /> ,
    
  },
  {
    Name:'Item Cost by Item Category',
    container: <WrapperPieChart series={inventoryValuation} />,
  },
]
