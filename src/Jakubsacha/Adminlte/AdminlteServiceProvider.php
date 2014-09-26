<?php namespace Jakubsacha\Adminlte;

use Illuminate\Support\ServiceProvider;

class AdminlteServiceProvider extends ServiceProvider {

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot() {
        $this->package('jakubsacha/adminlte');

        // Override Syntara Config.
        app('config')->set('syntara::views', app('config')->get('adminlte::views'));

        // Register Helpers.
        $this->registerHelpers();
    }

    public function registerHelpers() {
        // Register Breadcrumbs Helper.
        $this->app['breadcrumbs'] = $this->app->share(function() {
            return new Helpers\Breadcrumbs();
        });
        $this->app['assets'] = $this->app->share(function() {
            return new Helpers\Assets();
        });
        $js_assets = [
            "http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js",
            "http://code.jquery.com/jquery-migrate-1.2.1.min.js",
            "//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js",
            "//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js",
            "//cdn.datatables.net/plug-ins/725b2a2115b/integration/bootstrap/3/dataTables.bootstrap.js",
            "packages/mrjuliuss/syntara/assets/js/dashboard/base.js",
            "packages/mrjuliuss/syntara/assets/js/dashboard/user.js",
            "packages/mrjuliuss/syntara/assets/js/dashboard/group.js",
            "packages/mrjuliuss/syntara/assets/js/dashboard/permission.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/jquery-ui-1.10.3.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/bootstrap.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/morris/morris.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/sparkline/jquery.sparkline.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/fullcalendar/fullcalendar.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/jqueryKnob/jquery.knob.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/daterangepicker/daterangepicker.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/plugins/iCheck/icheck.min.js",
            "packages/jakubsacha/adminlte/AdminLTE/js/AdminLTE/app.js",
            "packages/jakubsacha/adminlte/js/app.js",
        ];
        if(\App::environment('local'))
          $js_assets = [
              "http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js",
              "http://code.jquery.com/jquery-migrate-1.2.1.min.js",
              "//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js",
              "//cdn.datatables.net/1.10.2/js/jquery.dataTables.min.js",
              "//cdn.datatables.net/plug-ins/725b2a2115b/integration/bootstrap/3/dataTables.bootstrap.js",
              "packages/mrjuliuss/syntara/assets/js/dashboard/base.js",
              "packages/mrjuliuss/syntara/assets/js/dashboard/user.js",
              "packages/mrjuliuss/syntara/assets/js/dashboard/group.js",
              "packages/jakubsacha/adminlte/js/admin-lte.min.js",
          ];
        foreach($js_assets as $js)
        {
            app('assets')->registerJs($js);
        }
        $css_assets = [
            "packages/jakubsacha/adminlte/AdminLTE/css/bootstrap.min.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/font-awesome.min.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/ionicons.min.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/morris/morris.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/jvectormap/jquery-jvectormap-1.2.2.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/fullcalendar/fullcalendar.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/daterangepicker/daterangepicker-bs3.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/AdminLTE.css",
            "packages/jakubsacha/adminlte/AdminLTE/css/datatables/dataTables.bootstrap.css",
            "packages/jakubsacha/adminlte/css/AdminLTE.css",
        ];
        if(\App::environment('local'))
          $css_assets = [
              "packages/jakubsacha/adminlte/css/admin-lte.min.css",
          ];
        foreach($css_assets as $css)
        {
            app('assets')->registerCss($css);
        }
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {
        /*
         * Register the service provider for the dependency.
         */
        $this->app->register('Thomaswelton\LaravelGravatar\LaravelGravatarServiceProvider');

        /*
         * Create alias for the dependency if its not already created.
         */
        $this->app->booting(function(){
            $loader = \Illuminate\Foundation\AliasLoader::getInstance();
            $aliases = \Config::get('app.aliases');

            // Alias the Gravatar package
            if (empty($aliases['Gravatar'])) {
                $loader->alias('Gravatar', 'Thomaswelton\LaravelGravatar\Facades\Gravatar');
            }
            if (empty($aliases['Assets'])) {
                $loader->alias('Assets', 'Jakubsacha\Adminlte\Facades\AssetsFacade');
            }
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides() {
        return array();
    }

}
