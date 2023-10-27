<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EvaluationController;
use App\Http\Controllers\Api\QuestionsController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\IdeaController;

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

Route::controller(AuthController::class)->group(function(){
    Route::get('login', 'login');
    Route::post('login', 'login');
    Route::post('forgot-password', 'forgotPassword');
    Route::post('reset-password', 'resetPassword');
});

Route::middleware('auth:sanctum')->prefix('user')->controller(AuthController::class)->group(function(){
    Route::post('update-password', 'updatePassword');
    Route::post('logout', 'logout');
    Route::post('profile-image-upload', 'profileImage');
    Route::post('update-device-token', 'saveMobileToken');
});

//Evaluation Controller Standings screen apis
Route::middleware('auth:sanctum')->controller(EvaluationController::class)->group(function(){
        Route::get('standings', 'standings');
        Route::get('standing-detail', 'standingDetail');
        Route::get('view-all-evaluation', 'viewAllEvaluation');
        Route::get('pending-rating-employees', 'pendingRatingTeamMembers');
});

//Questions Controller Standings screen apis
Route::middleware('auth:sanctum')->controller(QuestionsController::class)->group(function(){
        Route::get('questions-listing', 'departmentQuestions');
});

//Questions Controller Standings screen apis
Route::middleware('auth:sanctum')->controller(DashboardController::class)->group(function(){
        Route::get('user-profile', 'dashboard');
});

Route::middleware('auth:sanctum')->controller(FeedbackController::class)->group(function(){
        Route::post('save-feedback', 'saveFeedback');
});


Route::middleware('auth:sanctum')->controller(IdeaController::class)->group(function(){
        Route::get('get-all-ideas', 'getAllIdeas');
        Route::post('store-idea', 'storeIdea');
        Route::get('idea-detail', 'getIdeaDetail');
});


//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

