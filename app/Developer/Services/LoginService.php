<?php


namespace App\Developer\Services;


use App\Developer\ResponseService\ApiService;
use App\Developer\ResponseService\Facades\Api;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Carbon\Carbon;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Validator;

class LoginService
{
    public $api_response;

    public function __construct(ApiService $apiService)
    {
        $this->api_response = $apiService;
    }

    //Login user method only for APIs
    public function login($request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);
        if ($validation->fails()) {
//            return Api::error($validation->errors()->first(), 422);
            $return_array['message'] = $validation->errors()->first();
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password]) == true){
            $user = Auth::user();
            if($request->device_token != null && $request->device_token != ''){
                $user->device_token = $request->device_token;
                $user->update();
            }

            $return_array['user'] = new UserResource($user);
            $return_array['token'] =  $user->createToken('evaluation_app')->plainTextToken;
            $return_array['message'] = 'Login successfully';
            $return_array['error'] = false;
            $return_array['status'] = 200;
            return $return_array;
        }
        else{
            $message = 'Invalid Credentials';
            $return_array['message'] = $message;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
    }

    public function forgetPasswordSendEmail($request)
    {
        $validation = Validator::make($request->all(), ['email' => 'required|email']);
        if ($validation->fails()) {
//            return Api::error($validation->errors()->first(), 422);
            $return_array['message'] = $validation->errors()->first();
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $token = str_pad($this->generatePin(6), 6, '0', STR_PAD_LEFT);
            DB::table('password_resets')->where($request->only('email'))->delete();
            DB::table('password_resets')->insert([
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);
            $check = $user->notify(new ResetPasswordNotification($token,'api'));
            $message = 'Code sent Successfully';
            $return_array['message'] = $message;
            $return_array['error'] = true;
            $return_array['status'] = 200;
            return $return_array;
        } else {
            $return_array['message'] = 'User not found';
            $return_array['error'] = true;
            $return_array['status'] = 404;
            return $return_array;
        }
    }

    private function generatePin($digits = 4)
    {
        $i = 0;
        $pin = "";
        while ($i < $digits) {
            $pin .= mt_rand(0, 9);
            $i++;
        }
        return $pin;
    }

    public function resetPassword(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'otp' => 'required',
            'password' => 'required|confirmed'
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 404;
            return $return_array;
        }
        $token = $request->otp;
        $password = $request->password;
        $userEmail = DB::table('password_resets')
            ->select('email')
            ->where('token', '=', $token)
            ->first();
        if ($userEmail) {
            $affected = DB::table('users')
                ->where('email', $userEmail->email)
                ->update(['password' => Hash::make($password)]);
            $user = User::where('email',$userEmail->email)->first();
            if ($affected) {
                DB::table('password_resets')->where('email', '=', $userEmail->email)->delete();
                DB::table('personal_access_tokens')->where('tokenable_id', '=', $user->id)
                    ->where('tokenable_type','App\Models\User')->delete();
                $return_array['message'] = trans('auth.reset_success');
                $return_array['error'] = false;
                $return_array['status'] = 200;
                return $return_array;
            } else {
                $return_array['message'] = 'Not updated';
                $return_array['error'] = true;
                $return_array['status'] = 404;
                return $return_array;
            }
        } else {
            $return_array['message'] = 'Invalid OTP';;
            $return_array['error'] = true;
            $return_array['status'] = 404;
            return $return_array;
        }
    }

    public function updatePassword(Request $request)
    {
        $validation = Validator::make($request->all(), [
//            'email' => 'required',
            'current_password' => 'required',
            'password' => 'required|confirmed',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
//            return Api::error($validation->errors()->first(), 422);
        }

//        $user = User::where('email', $request->email)->first();
        $user = auth()->user();
        if ($user) {
            if (Hash::check($request->current_password, $user->password)) {
                $user->password = bcrypt($request->password);
//                auth()->user()->tokens()->delete();
                $user->save();
                $return_array['message'] = 'Password Updated successfully';
                $return_array['error'] = false;
                $return_array['status'] = 200;
                return $return_array;
            } else {
                $return_array['message'] = trans('auth.failed');
                $return_array['error'] = true;
                $return_array['status'] = 404;
                return $return_array;
            }
        } else {
            $return_array['message'] = trans('auth.failed');
            $return_array['error'] = true;
            $return_array['status'] = 404;
            return $return_array;
        }
    }

    public function logout($request){
        $user = auth()->user();
        $user->device_token = null;
        $user->update();
        auth()->user()->tokens()->delete();
        $return_array['message'] = trans('User logged out');
        $return_array['error'] = false;
        $return_array['status'] = 200;
        return $return_array;
    }

    public function profileImage($request){
        if(empty($request->all())){
            $return_array['message'] =  'Image required';
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        if ($request->file('image')) {
            $image = $request->file('image');
            $fileExtension = substr(strrchr($image->getClientOriginalName(), '.'), 1);
            if ($fileExtension != 'jpg' && $fileExtension != 'jpeg' && $fileExtension != 'png' && $fileExtension != 'gif') {
                $return_array['message'] =  'Image extension should be jpeg,jpg,png,and gif';
                $return_array['error'] = true;
                $return_array['status'] = 422;
                return $return_array;
            }
            $filesize = \File::size($image);
            if ($filesize >= 1024 * 1024 * 20) {
                $return_array['message'] =  'Image size should less than 20 mb';
                $return_array['error'] = true;
                $return_array['status'] = 422;
                return $return_array;
            }
        }

        $user = Auth::user();
        if ($request->file('image')) {
            $path = $request->file('image')->store('/profile_images','public');
            $user->image = $path;
        }

        $user = auth()->user();
        $user->update();
        $return_array['data'] = $user;
        $return_array['error'] = false;
        $return_array['status'] = 200;
        return $return_array;
    }

    public function saveMobileToken($request){
        $validation = Validator::make($request->all(), [
            'device_token' => 'required',
        ]);
        if ($validation->fails()) {
            $return_array['message'] = $validation->errors()->first();;
            $return_array['error'] = true;
            $return_array['status'] = 422;
            return $return_array;
        }
        $user = auth()->user();
        if ($user) {
            $user->device_token = $request->device_token;
            $user->update();
            $return_array['message'] = 'Token Updated Successfully';
            $return_array['error'] = false;
            $return_array['status'] = 200;
            return $return_array;
        } else {
            $return_array['message'] = 'Something went wrong!';
            $return_array['error'] = true;
            $return_array['status'] = 404;
            return $return_array;
        }
    }

}
