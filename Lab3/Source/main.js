$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
     var username=e.target.value;

        /* making request to api */
     $.ajax({
          url:"https://api.github.com/users/"+username,
          data:{
              client_id:'ed0da57f2e740f494a62',
              client_secret:'441c44c5b64e3297ea25a349ea53d3034dae7bde'
          }

        /* request for repo names */
      }).done(function(user){
          $.ajax({
              url:"https://api.github.com/users/"+username+"/repos",
              data:{
                  client_id:'ed0da57f2e740f494a62',
                  client_secret:'441c44c5b64e3297ea25a349ea53d3034dae7bde',
                  sort:"created:asc",
                  per_page:5
              }
          }).done(function(repos){
              $.each(repos,function (index,repo) {
                  $("#repos").append(`
                  <div class="well">
                  
                  <h4>${repo.name}</h4>
                  
                  </div>
                  `)

              })

          })

         /* request for follower names */
         $.ajax({
             url:"https://api.github.com/users/"+username+"/followers",
             data:{
                 client_id:'ed0da57f2e740f494a62',
                 client_secret:'441c44c5b64e3297ea25a349ea53d3034dae7bde',
                 per_page:5
             }
         }).done(function(followers){
            $.each(followers,function (index,value) {
                 $("#followers").append(`
                  <div class="well">
                   <h4>${value.login}</h4>
                   </div>
                   `)
             })
         })
          $('#profile').html(`
          <h3><b>User Name:</b> ${user.name}</h3>
          <h3><b>User ID:</b> ${user.id}</h3>
          <h3><b>Profile Picture:</b></h3><img src="${user.avatar_url}" width="300px" height="300px">
          <h3><b>GitHub Account Link: </b><a href="${user.html_url}">https://github.com/</a></h3>
          <h3><b>Account Created On:</b> ${user.created_at}</h3>
          <h3><b>Following:</b>${user.following}</h3>
          <h3><b>Followers:</b> ${user.followers}</h3>
          <h3 class="page-header"><b>Names of some followers: </b></h3>
          <div id="followers"></div>
          <h3><b>Public Repositories: </b>${user.public_repos}</h3>
          <h3 class="page-header"><b>Names of some public repositories: </b></h3>
          <div id="repos"></div>
          
        `);
      });
    });
});
