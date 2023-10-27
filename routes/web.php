<?php
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\UserController;
use App\Http\Controllers\Web\QuestionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::redirect('/', 'login');

//dd(\Illuminate\Support\Facades\DB::table('persons')->get());
/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/


//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->controller(DashboardController::class)->group(function(){
    Route::get('/dashboard','dashboardData')->name('dashboard');
});

Route::resource('users',UserController::class)->middleware(['auth', 'verified']);
Route::get('user/evaluation-detail',[UserController::class,'userMonthlyEvaluationDetail'])->name('user-evaluation-detail')->middleware(['auth', 'verified']);
Route::resource('questions',QuestionController::class)->middleware(['auth', 'verified']);

Route::get('/employeedetail', function () {
        return Inertia::render('EmployeeDetail');
})->middleware(['auth', 'verified'])->name('employeedetail');

Route::get('/selfevaluation', function () {
    return Inertia::render('SelfEvaluation');
})->middleware(['auth', 'verified'])->name('selfevaluation');

Route::get('/standings', function () {
    return Inertia::render('Standings');
})->middleware(['auth', 'verified'])->name('standings');

Route::get('/standings-detail', function () {
    return Inertia::render('StandingsDetail');
})->middleware(['auth', 'verified'])->name('standings-detail');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->middleware(['auth', 'verified'])->name('settings');
//
//Route::get('/addnewquestion', function () {
//    return Inertia::render('AddNewQuestions');
//})->middleware(['auth', 'verified'])->name('addnewquestion');


Route::get('/editemployee', function () {
    return Inertia::render('EditEmployee');
})->middleware(['auth', 'verified'])->name('editemployee');

Route::get('/ideas', function () {
    return Inertia::render('Ideas');
})->middleware(['auth', 'verified'])->name('ideas');

//check SamplePage.jsx
Route::get('/page', function () {
    return Inertia::render('SamplePage');
})->name('sample_one');


// route to generate fake data

//Route::get('generate-data',[\App\Http\Controllers\TestController::class,'generateData']);
//Route::get('generate-users',[\App\Http\Controllers\TestController::class,'generate_users']);
//Route::get('generate-questions',[\App\Http\Controllers\TestController::class,'generate_questions']);
Route::get('generate-feedback',[\App\Http\Controllers\TestController::class,'generate_feedbacks']);
//Route::get('old-users',[\App\Http\Controllers\TestController::class,'get_old_users']);
//Route::get('import-users',[\App\Http\Controllers\TestController::class,'importUsers']);
//Route::get('import-leads',[\App\Http\Controllers\TestController::class,'makeTeamLeads']);
//Route::get('update-roles',[\App\Http\Controllers\TestController::class,'updateRoles']);


require __DIR__.'/auth.php';
