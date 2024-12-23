import { Hono } from 'hono';
import { handle } from 'hono/vercel';

// import plaid from "./plaid";
// import accounts from './accounts';
import categories from './categories';
import cogLocations from './coglocations';
import customers from './customers';
import assetsConstraints from './assetsconstraints';
import demandByDistances from './demandbydistances';
import demandFulfillments from './demandfulfillments';
import demands from './demands';
import distanceByDemands from './distancebydemands';
import facilities from './facilities';
import groups from './groups';
import locations from './locations';
import periods from './periods';
import productFlows from './productflows';
import products from './products';
import summary from './summary';
import transactions from './transactions';
import units from './units';
import vehicleTypes from './vehicleTypes';
import customConstraints from './customconstraints';
import linearRanges from './linearranges';
import indicatorConstraints from './indicatorconstraints';
import objectiveMembers from './objectivemembers';
import unitconversions from './unitconversions'
import processingcosts from './processingcost'
import productStorages from './productstorages'
import sitestatechanges from './sitestatechanges'
import production_no from './production_no'
import periodgroups from './periodgroups'
import milkRuns from './milkruns'
import fleets from './fleets'
import processingTime from './processingtime'
import loadingUnloadingGates from './loadingunloadinggates'
import orderingRules from './orderingrules'
import shipping from './shipping'
import timeWindows from './timewindow'
import paymentTerms from './paymentterms'
import salesBatches from './salesbatches'
import vehiclesSelections from './vehicleselections'
import boms from './boms'
import facilityExpenses from './facilityexpenses'
import locationGroups from './locationgroups'
import demandForecasts from './demandforecasts'
import cashAccounts from './cashaccounts'
import productGroups from './productgroups'
import co2Facilities from './co2facilities'
import co2Processing from './co2processings'
import inventorys from './inventorys'

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const routes = app
  // .route("/plaid", plaid)
  .route('/summary', summary)
  // .route('/accounts', accounts)
  .route('/categories', categories)
  .route('/transactions', transactions)
  // .route('/subscriptions', subscriptions)
  .route('/customers', customers)
  .route('/locations', locations)
  .route('/products', products)
  .route('/groups', groups)
  .route('/units', units)
  .route('/facilities', facilities)
  .route('/demands', demands)
  .route('/periods', periods)
  .route('/vehicleTypes', vehicleTypes)
  .route('/coglocations', cogLocations)
  .route('/demandbydistances', demandByDistances)
  .route('/distancebydemands', distanceByDemands)
  .route('/productflows', productFlows)
  .route('/demandfulfillments', demandFulfillments)
  .route('/assetsconstraints', assetsConstraints)
  .route('/customconstraints', customConstraints)
  .route('/indicatorconstraints', indicatorConstraints)
  .route('/objectivemembers', objectiveMembers)
  .route('/linearranges', linearRanges)
  .route('/unitconversions',unitconversions)
  .route('/processingcosts', processingcosts)
  .route('/productstorages', productStorages)
  .route('/sitestatechanges', sitestatechanges)
  .route('/production_no', production_no)
  .route('/periodgroups', periodgroups)
  .route('/milkruns', milkRuns)
  .route('/fleets', fleets)
  .route('/processingtime', processingTime)
  .route('/loadingunloadinggates', loadingUnloadingGates)
  .route('/orderingrules', orderingRules)
  .route('/shipping', shipping)
  .route('/timewindows', timeWindows)
  .route('/paymentterms', paymentTerms)
  .route('/salesbatches', salesBatches)
  .route('/vehicleselections', vehiclesSelections)
  .route('/boms', boms)
  .route('/facilityexpenses', facilityExpenses)
  .route('/locationgroups', locationGroups)
  .route('/demandforecasts', demandForecasts)
  .route('/cashaccounts', cashAccounts)
  .route('/productgroups', productGroups)
  .route('/co2facilities', co2Facilities)
  .route('/co2processing', co2Processing)
  .route('/inventorys', inventorys)




export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
