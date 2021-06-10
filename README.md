# ArtBox

ArtBox is an image-sharing social media website created with Laravel, React, and MariaDB.

It has the following features:

-   Dynamic interface
-   Authentication system (Login/Register)
-   Posts (Full CRUD functionality)
-   Masonry grid layout for posts
-   Comments (Full CRUD functionality)
-   Profile customization (profile picture, edit details)
-   User profiles
-   Authorization for resources
-   Front and backend form validation
-   Email notifications for new comments

# Dev Setup

You should have PHP and a SQL driver installed. If you wish to use PostgreSQL, you need to enable the PostgreSQL driver for PHP in `php.ini`.

**Windows**

1. Copy the `.env.example` and create your own `.env`, filling in the database environment variables and the `APP_KEY`. You can generate an app key with `php artisan key:generate` in the project directory.
2. Install dependencies by first running `yarn`, then `composer i`.
3. With your database set up, run `php artisan migrate` under the project directory.
4. Under the `public` directory, delete the `storage` folder.
5. Run `php artisan storage:link` and the `storage` folder should be recreated.
6. Run `npm run hot` to start the React frontend with hot-reloading.
7. Run `php artisan serve` to serve the Laravel backend.
8. For email functionality, run `php artisan queue:listen`.
9. Visit the site (`localhost:8000` by default). Telescope is also installed, so you can see things like requests by going to `localhost:8000/telescope`.

# Screenshots

![Account Settings](https://i.imgur.com/iUHBza6.png)
![Home Page](https://i.imgur.com/wtHQJqs.png)
![Post](https://i.imgur.com/qkXxJTJ.png)
![Edit Post](https://i.imgur.com/wXid5e3.png)
![Profile](https://i.imgur.com/aWAAWto.png)
