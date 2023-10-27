<?php


namespace App\Notifications\drivers;


use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FCMDriver
{

    public function send($notifiable_model, $notification_object)
    {
        $notification_allowed = true;

        $fcm_key = 'AAAAQbyv_ck:APA91bHJ65Q4uykV1VPXpTG6VdRAHaLuxEmACSlU7EHTNV2pRIySAmq3jbCu5ued9LGCknM_QvCiPtUAl9AdUmk8HI_Bv4rAqaCsiiD2SXIqjJDJrnJiJpQOJ9tT17pVAvPitHFw0utb';
        try {
            if ($notifiable_model->device_token && $notification_allowed) {
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                    'Authorization' => 'key=' .$fcm_key
                ])->post('https://fcm.googleapis.com/fcm/send', [
                    'to' => $notifiable_model->device_token,
                    'notification' => [
                        'title' => $notification_object->title,
                        'body' => $notification_object->body,
                        'sound' => 'default',
                        //            'badge' => '1',
                    ],
                    'priority' => 'high',
                    'data' => $notification_object->notification_data
                ]);

                Log::channel('daily')->info('Notification send to! =>' . json_encode($notification_object));
                return $response->json();
            }
        } catch (\Exception $e) {
            Log::channel('daily')->info('Notification send exception =>' . $e->getMessage());
            return false;
        }
    }

}
