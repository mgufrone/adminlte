@extends(Config::get('syntara::views.master'))

@section('content')
<div class="error-page">
    <h2 class="headline text-info"> 404</h2>
    <div class="error-content">
        <h3><i class="fa fa-warning text-yellow"></i> Oops! Page not found.</h3>
        <p>
            {{$message}}
        </p>
        <form class="search-form">
            <div class="input-group">
                <input name="search" class="form-control" placeholder="Search" type="text">
                <div class="input-group-btn">
                    <button type="submit" name="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                </div>
            </div><!-- /.input-group -->
        </form>
    </div><!-- /.error-content -->
</div>
@stop