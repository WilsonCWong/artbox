<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use App\Traits\UploadTrait;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    use UploadTrait;

    public function __construct() {
        $this->middleware('auth');
        $this->middleware('cache.headers:public;etag')
            ->only(['show']);
    }


    public function show($username) {
        if (auth()->check()) {
            $user = User::where('username', $username)->firstOrFail();

            $res = $user->load('posts');

            return response()->json(['user' => $res], 200);
        }
        else {
            return response('', 401);
        }
    }

    public function updateProfile(Request $request) {
        $user = User::findOrFail(auth()->user()->id);

        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique('users')->ignore($user)],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user)],
            'profile_picture' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user->username = $request->input('username');

        if ($request->has('profile_picture')) {
            $image = $request->file('profile_picture');
            $name = Str::slug($request->input('username')).'_'.time();
            $folder = "/uploads/profile_pictures/";

            $filePath = $folder . $name . '.' . $image->getClientOriginalExtension();
            $currentFilePath = $user->profile_picture;

            $this->uploadOne($image, $folder, 'public', $name);
            $user->profile_picture = $filePath;
            Storage::disk('public')->delete($currentFilePath);
        }

        $user->save();

        return response()->json(['user' => $user], 200);
    }

}
