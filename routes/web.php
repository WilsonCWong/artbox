<?php

use Illuminate\Http\Request;

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

Route::group(['prefix' => 'web_api'], function() {
    Route::get('checkAuth', 'AuthCheckController');
    // For testing purposes
    Route::get('csrf', 'TestController@csrf');

    Route::get('authorize/posts/{post}', 'AuthorizationController@canUpdatePost');
    Route::get('authorize/comments/{comment}', 'AuthorizationController@canUpdateComment');

    Route::get('feed/home/{quantity}', 'FeedController@home');
    Route::get('feed/users/{quantity}', 'FeedController@users');

    Route::get('profile/{username}', 'ProfileController@show');
    Route::patch('profile', 'ProfileController@updateProfile')->name('profile.update');

    Route::post('/posts/{post}/comments', 'CommentController@store');
    Route::patch('/comments/{comment}', 'CommentController@update');
    Route::delete('/comments/{comment}', 'CommentController@destroy');

    Route::get('posts/{post}', 'PostController@show');
    Route::post('posts', 'PostController@store');
    Route::patch('posts/{post}', 'PostController@update');
    Route::delete('posts/{post}', 'PostController@destroy');
});

// Authentication Routes
Route::post('login', 'Auth\LoginController@login')->name('login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes
Route::post('register', 'Auth\RegisterController@register');

// TODO: Password Reset Routes
//Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
//Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');

// TODO: Password Confirmation Routes
//Route::post('password/confirm', 'Auth\ConfirmPasswordController@confirm');

// TODO: Email Verification Route
//Route::post('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');

Route::view('/{path?}', 'layouts.react')
     ->where('path', '.*')
     ->name('react');


