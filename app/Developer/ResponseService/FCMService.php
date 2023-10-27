<?php


namespace App\Developer\ResponseService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;

class FCMService
{

    public static function sendFCMMessage($deviceToken, $title, $body, $data = []){
        $url = 'https://fcm.googleapis.com/fcm/send';
        $serverKey = env('FCM_SERVER_KEY');
        $notification = array(
            'title' =>$title,
            'body' => $body,
            'sound' => 'default',
//            'badge' => '1',
        );
        $arrayToSend = [
            'to' => $deviceToken,
            'notification' => $notification,
            'priority'=>'high',
            'data' => $data
        ];
        $notification_body_json = json_encode($arrayToSend);
        try{
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'key='. $serverKey
                ])->post($url,$arrayToSend);
            return $response->json();
           /* $headers = [
                'Authorization: key=' . $serverKey,
                'Content-Type: application/json',
            ];
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $notification_body_json);
            return curl_exec($ch);*/
        }
        catch (\Exception $e){
            Log::channel('daily')->info('Notification send to manager exception =>'. $e->getMessage());
            return false;
        }
    }

}
