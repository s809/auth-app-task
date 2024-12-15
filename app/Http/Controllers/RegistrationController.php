<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrationController
{
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required', 'min:3'],
            'email' => ['required', 'email', 'unique:App\Models\User,email'],
            'password' => [
                'required',
                'min:8',
                'regex:/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d).*$/u'
            ],
        ]);

        $user = new \App\Models\User();
        $user->name = $credentials["name"];
        $user->email = $credentials["email"];
        $user->password = Hash::make($credentials["password"]);
        $user->save();

        $token = $user->createToken('Authentication');
        return response()->json([
            'access_token' => $token->accessToken
        ]);
    }
}
