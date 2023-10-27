<?php
    if (!function_exists('returnSuccessResponseArray')){
        function returnSuccessResponseArray($array = null,$status_code = 200)
        {
            $array['status'] = $array['status'] ?? 'success';
            return response()->json($array,$status_code);
        }
    }
    if (!function_exists('returnFailedResponseArray')){
        function returnFailedResponseArray($array = null,$status_code = 400)
        {
            $array['status'] = $array['status'] ?? 'error';
            return response()->json($array,$status_code);
        }
    }
    if (!function_exists('errorDetails')){
        function errorDetails($e,$showMessage = false)
        {
            //in dev, we can see all details of the exception
            if(app()->environment() == 'local'){
                return ' '.$e->getMessage() . ' ' . $e->getFile() . ' ' . $e->getLine();
            }
            //in production if necessary then we can show exception message
            //I have made it optional because usually we want to send the error message our own.
            if ($showMessage){
                return ' '.$e->getMessage();
            }
            //otherwise we can send message separately according to action performed in `returnFailedResponseArray` or `returnSuccessResponseArray`
            return '';
        }
    }
