<?php

use App\Models\Feedback;
use App\Models\Department;

if (!function_exists('testFunction')){
    function testFunction()
    {
        return 'This is test';
    }
}


if (!function_exists('formatNumbers')){
    function formatNumbers($number)
    {
        return number_format($number,2);
    }
}

if (!function_exists('dateFormat')){
    function dateFormat($date)
    {
        return \Carbon\Carbon::parse($date)->toFormattedDateString();
    }
}


if (!function_exists('imagePath')){
    function imagePath($image)
    {
        if($image == ''){
            return null;
        }
         $image = asset('/storage/'.$image);
         return $image;
    }
}

if (!function_exists('months')){
    function months()
    {
        $months_array = [
            '01' => 'january',
            '02' => 'february',
            '03' => 'march',
            '04' => 'april',
            '05' => 'may',
            '06' => 'june',
            '07' => 'july',
            '08' => 'august',
            '09' => 'september',
            '10' => 'October',
            '11' => 'November',
            '12' => 'December',
        ];

        return $months_array;
    }
}

if (!function_exists('month_rating')){
    function month_rating()
    {
        // todo set it later
//        Feedback::where('id', $request->feedback_id)
//            ->whereHas('feedbackAnswers', function ($q) use ($user) {
//                $q->where('given_to', $user->id);
//            })
//            ->withAvg('feedbackAnswers', 'rating')
//            ->first();
    }
}

if (!function_exists('departments')){
    function departments()
    {
        return Department::all();
    }
}

if (!function_exists('get_departments')){
    function get_departments()
    {
         return Department::select('id as value','name as label')->get();
    }
}
