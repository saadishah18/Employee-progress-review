<?php namespace App\Developer\ResponseService\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \Illuminate\Support\Facades\Response response($data = null, $message = '', $status = 200)
 * @method static \Illuminate\Support\Facades\Response not_found($message = '')
 * @method static boolean validate($rules, $messages = [])
 * @method static \Illuminate\Support\Facades\Response validation_errors()
 * @method static \Illuminate\Support\Facades\Response error($message = '', $status = 422)
 * @method static \Illuminate\Support\Facades\Response server_error(\Throwable $throwable)
 * @method static \Illuminate\Support\Facades\Response forbidden()
 * @method static \Illuminate\Support\Facades\Response unauthenticated()
 *
 * @see \App\Service\ApiService
 */
class Api extends Facade
{

    protected static function getFacadeAccessor()
    {
        return '\App\Developer\ResponseService\ApiService';
    }

}
