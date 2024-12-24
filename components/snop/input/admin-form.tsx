import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AdminInput() {
 
  return (
    <div className="grid w-full  gap-10">
      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="lyf">
          Life
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id=""
          name="life"
          // defaultValue={admin["life"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>

      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="disesel">
          Diesel Price
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id=""
          name="diesel_price"
          // defaultValue={admin["diesel_price"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>

      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="load">
          Loading/ Unloading
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id="load"
          name="loading_unloading"
          // defaultValue={admin["loading_unloading"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>

      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="tol">
          Toll
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id=""
          name="toll"
          // defaultValue={admin["toll"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>

      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="route">
          Route Expenses
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id=""
          name="route_expenses"
          // defaultValue={admin["route_expenses"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>

      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="driver">
          Driver & Cleaner Expenses
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id=""
          name="driver_expenses"
          // defaultValue={admin["driver_expenses"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>

      <div className="grid grid-cols-2 items-center gap-1">
        <Label className="text-lg" htmlFor="tyr">
          Tyres
          <p className="text-gray-400 text-sm"></p>
        </Label>
        <Input
          id=""
          name="tyres"
          // defaultValue={admin["tyres"]}
          className="text-lg text-gray-500 text-center"
        />
      </div>
    </div>
  );
}
