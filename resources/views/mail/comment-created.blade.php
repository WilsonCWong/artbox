@component('mail::message')
<head>
    <style>
        .inline {
            display: inline;
        }
        .user {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            margin-top: 30px;
        }
        .link {
            margin-bottom: 0;
            -webkit-text-decoration: none;
            text-decoration: none;
            color: black;
            font-weight: bold;
            -webkit-transition: color 0.2s ease-in-out;
            transition: color 0.2s ease-in-out;
            display: inline;
        }
        .link:hover {
            -webkit-text-decoration: none !important;
            text-decoration: none !important;
            color: #6c6c6c !important;
        }
        .ml-10 {
            margin-left: 10px;
        }
        .avatar {
            width: 40px;
            height: 40px;
            display: flex;
            object-fit: cover;
            overflow: hidden;
            position: relative;
            font-size: 1.25rem;
            align-items: center;
            flex-shrink: 0;
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            line-height: 1;
            user-select: none;
            border-radius: 50%;
            justify-content: center;
        }
        .quote {
            border-left: solid #666f76 3px;
            padding-left: 15px;
            margin-bottom: 30px;
            margin-left: 3px;
        }
    </style>
</head>
# A New Comment Was Added on Your Post:
# "{{ $post->title }}"

<div class="user">
    <img class="avatar" alt="commenter profile picture" src="{{ url('/storage' . $comment->commenter->profile_picture) }}" />
    <span class="inline ml-10">
        <a class="link" href="{{url('/profile/' . $comment->commenter->username)}}">{{ $comment->commenter->username }}</a> Says:
    </span>
</div>

<p class="quote">{{ $comment->comment }}</p>

@component('mail::button', ['url' => url('/posts/' . dechex((float) $post->id))])
View Post
@endcomponent

@endcomponent
