<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shipment;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;



class ShipmentController extends Controller
{
    public function getAllShipments()
    {

        $shipments = Shipment::where('in_progress', 1)->get();

        foreach ($shipments as $each) {
            $each->user;
            $each->customer;
        }
        $respond = [
            'status' => '200',
            'message' => 'All Shipments',
            'data' => $shipments,
        ];
        return $respond;
    }
    public function getShipmentByid($id)
    {

        $shipments = Shipment::where('in_progress', 1)->where('id', $id)->first();

        if (isset($shipments)) {
            $shipments->user;
            $shipments->customer;
            $respond = [
                'status' => '200',
                'message' => 'Shipment found',
                'data' => $shipments
            ];
            return $respond;
        }
        $respond = [
            'status' => '401',
            'message' => 'Shipment not found',
            'data' => null
        ];
        return $respond;
    }
    function addShipment(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'from' => 'required',
            'to' => 'required',
            'via' => 'required',
            'estimated_delivery' => 'required',
            'in_progress' => 'required',

        ]);

        if ($validator->fails()) {
            $respond = [
                'status' => 401,
                'message' =>  $validator->errors()->first(),
                'data' => null,
            ];
            return $respond;
        }

        $new_shipment = new Shipment();
        $new_shipment->from = $request->from;
        $new_shipment->to = $request->to;
        $new_shipment->via = $request->via;
        $new_shipment->estimated_delivery = $request->estimated_delivery;
        $new_shipment->in_progress = $request->in_progress;
        $new_shipment->customerName = $request->customerName;
        $new_shipment->customerPhone = $request->customerPhone;
        $new_shipment->customerAddress = $request->customerAddress;
        $new_shipment->user_id = Auth::user()->id;
        $new_shipment->save();

        $respond = [
            'status' => 200,
            'message' => "Shipment successfully created",
            'data' => $new_shipment,
        ];
        return $respond;
    }

    public function updateShipment(Request $request, $id)
    {
        $shipment = Shipment::find($id);

        if (isset($shipment)) {

            $input = $request->all();
            $shipment = shipment::where('id', $id)->update($input);
            $respond = [
                'status' => '200',
                'message' => 'Shipment successfully updated',
                'data' => $shipment
            ];
            return $respond;
        } else {
            $respond = [
                'status' => '401',
                'message' => 'Shipment not found',
                'data' => null
            ];
            return $respond;
        }
    }

    public function softDeleteShipment($id)
    {
        $shipment = Shipment::find($id);

        if (isset($shipment)) {
            $shipment->in_progress = 0;
            $shipment->save();

            $respond = [
                'status' => '200',
                'message' => 'Customer successflully deleted',
                'data' => $shipment
            ];
            return $respond;
        }
        $respond = [
            'status' => '401',
            'message' => 'Shipment not found',
            'data' => null
        ];
        return $respond;
    }
}
