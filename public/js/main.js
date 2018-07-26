$(document).ready(function(){
        $('.remove-book').click(function(e){
            deleteId = $(this).data('id');
            $.ajax({
                url: '/manage/books/delete/'+deleteId,
                type: 'DELETE',
                success: function(){

                }
            });
            alert('Book Delted Successfully');
            window.location = '/manage/books';
        });

        $('.remove-category').click(function(e){
            deleteId = $(this).data('id');
            $.ajax({
                url: '/manage/categories/delete/'+deleteId,
                type: 'DELETE',
                success: function(){

                }
            });
            alert('Category Delted Successfully');
            window.location = '/manage/categories';
        });

});




