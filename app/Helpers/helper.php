<?php

use App\Models\User;

if (!function_exists('flashMessage')) // jika function flash message ada / tidak , jika belum di definsikan
{
    function flashMessage($message,$type='success'):void{ //tidak mengembalikan nilai apapun(void)
        session()->flash("message",$message);
        session()->flash('type',$type);
    }
}

if(!function_exists('usernameGenerator'))
{
    function usernameGenerator(string $name):string
    {
        $username = strtolower(preg_replace('/\s+/','_',trim($name)));
        $original_username = $username;
        $count = 1;

        while(User::where('username',$username)->exists())
        {
            $username = $original_username . $count;
            $count++;
        }
        return $username;
    }
}

if (!function_exists('signatureMidtrans')) {
    function signatureMidtrash($order_id,$status_code,$gross_amount,$server_key)
    {
        return hash('sha512',$order_id.$status_code.$gross_amount.$server_key); // algoritma sha512
    }
}
