<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ShipmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(['middleware' => ['jwt.verify']], function () {


    //Shipments Routes
    Route::group(['prefix' => 'shipments'], function () {
        Route::get('/', [ShipmentController::class, 'getAllShipments']);
        Route::get('/{id}', [ShipmentController::class, 'getShipmentByid']);
        Route::post('/', [ShipmentController::class, 'addShipment']);
        Route::post('/{id}', [ShipmentController::class, 'updateShipment']);
        Route::delete('/{id}', [ShipmentController::class, 'softDeleteShipment']);
    });
});

//Users Routes
Route::group(['prefix' => 'users'], function () {
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
});
