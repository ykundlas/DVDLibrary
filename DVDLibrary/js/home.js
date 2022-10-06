
$(document).ready(function(){
	
	loadDvds();
	createDvd();
	searchDvdLibrary();
	editDvd();
	


});	

   function loadDvds() {
	   
	   
	   clearDvdTable();
	   var contentRows = $('#contentRows');

   $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com//dvds',
	     success: function(dvdArray) {
         
          $.each(dvdArray, function(index, dvd)  { 
                   var title = dvd.title;
				   var releaseYear =  dvd.releaseYear;
				   var director = dvd.director;
				   var rating = dvd.rating;
				   var dvdId = dvd.id;
                   
                 var row = '<tr>';       
                       
                 row += '<td>'+'<a onclick="showDvd(' + dvdId + ')" button type="button" class="btn btn-link">'+title+'</button>'+'</td>';
				 row += '<td>' + releaseYear + '</td>';
				 row += '<td>' + director + '</td>';
				 row += '<td>' + rating + '</td>';
				 row += '<td><a  onclick="showEditForm(' + dvdId + ')" button type="button" class="btn btn-info">Edit</button></td>';
				 row +='<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + dvdId + ')">Delete</button></td>';
				 row += '</tr>';

				contentRows.append(row);
				
				 
            })
        
        },
				 
				 
         error: function() {
			 
			  $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        
        }
    });
		
         

}

function createDvd() {
    $('#createDvdButton').click(function (event) {
		
		 if( checkAndDisplayCreateValidationErrors()== false){
			 return false;
		 }
		
		
        $.ajax({
           type: 'POST',
           url: 'http://dvd-library.us-east-1.elasticbeanstalk.com//dvd',
           data: JSON.stringify({
                title: $('#createTitle').val(),
                releaseYear: $('#createReleaseYear').val(),
                director: $('#createDirector').val(),
                rating: $('#createRating').val(),
                notes: $('#createNotes').val()
           }),
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
           },
           'dataType': 'json',
           success: function() {
               $('#errorMessages').empty();
               $('#createTitle').val('');
               $('#createReleaseYear').val('');
               $('#createDirector').val('');
               $('#createRating').val('');
               $('#createNotes').val('');
			    $('#createFormDiv').hide();
			
				  $('#dvdTableDiv').show();
               loadDvds();
           },
           error: function () {
               $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
           }
        })
    });
}

function showCreateDvdForm(){
	
	$('#errorMessages').empty();
	 $('#dvdTableDiv').hide();
	   $('#createFormDiv').show();
	 $('#createFormDiv').show();
	
}

function hideCreateForm() {
    $('#errorMessages').empty();
    
    $('#createtitle').val('');
    $('#createReleaseYear').val('');
    $('#createDirector').val('');
    $('#createRating').val('');
    $('#createNotes').val('');

    $('#dvdTableDiv').show();
     $('#createFormDiv').hide();
	  $('#top').show();
	
}

function showDvd(dvdId) {
	$('#errorMessages').empty();
	 $('#dvdTableDiv').hide();
	 
	
	  $('#top').hide();
	 
	  $.ajax({
        type: 'GET',
        url:  'http://dvd-library.us-east-1.elasticbeanstalk.com//dvd/'  + dvdId,
        success: function(data, status) {
            var title =$('#displayTitle');
			title.append(data.title);
            $('#displayReleaseYear').val(data.releaseYear);
            $('#displaydirector').val(data.director);
            $('#displayrating').val(data.rating);
            $('#displaynotes').val(data.notes);
            $('#dvdId').val(data.id);
            
        },
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
        }
    })
	 
	  $('#displayDvd').show();
}

function hideDvdInfo(){
	$('#errorMessages').empty();
	 $('#dvdTableDiv').show();
	$('#releaseY').val('');
	$('#dir').val('');
	$('#rat').val('');
	$('#not').val('');
	 $('#displayDvd').hide();
	 $('#top').show();
}

function showEditForm(dvdId) {
	$('#errorMessages').empty();
	
	
	  $('#top').hide();
	  clearTitle();
	 
	  $.ajax({
        type: 'GET',
        url:  'http://dvd-library.us-east-1.elasticbeanstalk.com//dvd/'  + dvdId,
        success: function(data, status) {
			
			var title = $('#titledvd');
	        title.append(data.title);
			
            $('#editTitle').val(data.title);
            $('#editReleaseYear').val(data.releaseYear);
            $('#editDirector').val(data.director);
            $('#editRating').val(data.rating);
            $('#editNotes').val(data.notes);
            $('#editId').val(data.id);
            
        },
		
		
        error: function() {
            $('#errorMessages')
            .append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')); 
        }
    })
	
	 
	  $('#editFormDiv').show();
	   $('#dvdTableDiv').hide();
	 $('#displayDvd').hide();
}

function hideEditForm() {
    $('#errorMessages').empty();
    
    $('#editTitle').val('');
    $('#editReleaseYear').val('');
    $('#editDirector').val('');
    $('#editNotes').val('');
    $('#editFormDiv').hide();
	$('#top').show();
	
	$('#dvdTableDiv').show();
}



function editDvd() {
    $('#updateButton').click(function(event) {
		
		
		if( checkAndDisplayEditValidationErrors()== false){
			 return false;
		 }
		
        $.ajax({
            type: 'PUT',
            url:  'http://dvd-library.us-east-1.elasticbeanstalk.com//dvd/'+ $('#editId').val(),
            data: JSON.stringify({
				id: $('#editId').val(),
                title: $('#editTitle').val(),
                releaseYear: $('#editReleaseYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
                
            }),
			
            'contentType': 'application/json',
            success: function() {
                $('#errorMessages').empty();
				hideEditForm();
                loadDvds();
               
            },
            error: function() {
                $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.')); 
            }
        });
    })
}


function deleteDvd(dvdId) {
	 if (confirm("Are you sure you want to delete this dvd from the collection?")) {
    $.ajax({
        type: 'DELETE',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvd/' + dvdId,
        success: function() {
            loadDvds();
        }
    });
}
 return false;
}


function clearDvdTable() {
    $('#contentRows').empty();
}

function searchDvdLibrary(){
	  $('#search').click(function (event) {
		  
		 if( checkAndDisplaySearchValidationErrors()== false){
			 return false;
		 }
		  
		  
		
		
	
	 clearDvdTable();
	 var contentRows = $('#contentRows');
	 
	var optionvalue = $('#searchcategory').val();
	var searchterm =  $('#searchterm').val();
	
	if(optionvalue == "title"){
		
		 
		
		  $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/title/' + searchterm,
	     success: function(dvdArray) {
         
          $.each(dvdArray, function(index, dvd)  { 
                   var title = dvd.title;
				   var releaseYear =  dvd.releaseYear;
				   var director = dvd.director;
				   var rating = dvd.rating;
				   var dvdId = dvd.id;
                   
                 var row = '<tr>';       
                       
                 row += '<td>'+'<a onclick="showDvd(' + dvdId + ')" button type="button" class="btn btn-link">'+title+'</button>'+'</td>';
				 row += '<td>' + releaseYear + '</td>';
				 row += '<td>' + director + '</td>';
				 row += '<td>' + rating + '</td>';
				 row += '<td><a  onclick="showEditForm(' + dvdId + ')" button type="button" class="btn btn-info">Edit</button></td>';
				 row +='<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + dvdId + ')">Delete</button></td>';
				 row += '</tr>';

				contentRows.append(row);
				
				 
            })
        
        },
				 
				 
         error: function() {
			 
			  $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        
        }
    });
		
		
	}
    if(optionvalue == "year"){
		
		 $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/year/' + searchterm,
	     success: function(dvdArray) {
         
          $.each(dvdArray, function(index, dvd)  { 
                   var title = dvd.title;
				   var releaseYear =  dvd.releaseYear;
				   var director = dvd.director;
				   var rating = dvd.rating;
				   var dvdId = dvd.id;
                   
                 var row = '<tr>';       
                       
                 row += '<td>'+'<a onclick="showDvd(' + dvdId + ')" button type="button" class="btn btn-link">'+title+'</button>'+'</td>';
				 row += '<td>' + releaseYear + '</td>';
				 row += '<td>' + director + '</td>';
				 row += '<td>' + rating + '</td>';
				 row += '<td><a  onclick="showEditForm(' + dvdId + ')" button type="button" class="btn btn-info">Edit</button></td>';
				 row +='<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + dvdId + ')">Delete</button></td>';
				 row += '</tr>';

				contentRows.append(row);
				
				 
            })
        
        },
				 
				 
         error: function() {
			 
			  $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        
        }
    });
		
		
		
	}
	if(optionvalue == "director"){
		
		
		$.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/director/' + searchterm,
	     success: function(dvdArray) {
         
          $.each(dvdArray, function(index, dvd)  { 
                   var title = dvd.title;
				   var releaseYear =  dvd.releaseYear;
				   var director = dvd.director;
				   var rating = dvd.rating;
				   var dvdId = dvd.id;
                   
                 var row = '<tr>';       
                       
                 row += '<td>'+'<a onclick="showDvd(' + dvdId + ')" button type="button" class="btn btn-link">'+title+'</button>'+'</td>';
				 row += '<td>' + releaseYear + '</td>';
				 row += '<td>' + director + '</td>';
				 row += '<td>' + rating + '</td>';
				 row += '<td><a  onclick="showEditForm(' + dvdId + ')" button type="button" class="btn btn-info">Edit</button></td>';
				 row +='<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + dvdId + ')">Delete</button></td>';
				 row += '</tr>';

				contentRows.append(row);
				
				 
            })
        
        },
				 
				 
         error: function() {
			 
			  $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        
        }
    });
		
		
		
		
	}
   if(optionvalue =="rating"){
	   
	   $.ajax({
        type: 'GET',
        url: 'http://dvd-library.us-east-1.elasticbeanstalk.com/dvds/rating/' + searchterm,
	     success: function(dvdArray) {
         
          $.each(dvdArray, function(index, dvd)  { 
                   var title = dvd.title;
				   var releaseYear =  dvd.releaseYear;
				   var director = dvd.director;
				   var rating = dvd.rating;
				   var dvdId = dvd.id;
                   
                 var row = '<tr>';       
                       
                 row += '<td>'+'<a onclick="showDvd(' + dvdId + ')" button type="button" class="btn btn-link">'+title+'</button>'+'</td>';
				 row += '<td>' + releaseYear + '</td>';
				 row += '<td>' + director + '</td>';
				 row += '<td>' + rating + '</td>';
				 row += '<td><a  onclick="showEditForm(' + dvdId + ')" button type="button" class="btn btn-info">Edit</button></td>';
				 row +='<td><button type="button" class="btn btn-danger" onclick="deleteDvd(' + dvdId + ')">Delete</button></td>';
				 row += '</tr>';

				contentRows.append(row);
				
				 
            })
        
        },
				 
				 
         error: function() {
			 
			  $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        
        }
    });
	   
   }
	   
	
	  });
}

function checkAndDisplayValidationErrors(input) {
    $('#errorMessages').empty();
    
    var errorMessages = [];
    
    input.each(function() {
        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessages.push(errorField + ' ' + this.validationMessage);
        }  
    });
    
    if (errorMessages.length > 0){
        $.each(errorMessages,function(index,message) {
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));
			
			
	
        });
        // return true, indicating that there were errors
        return true;
    } else {
        // return false, indicating that there were no errors
        return false;
    }
}

function clearTitle(){
	$('#titledvd').empty();
}


function checkAndDisplaySearchValidationErrors() {
    $('#errorMessages').empty();
    
    var searchcategory = document.forms["searchForm"]["searchcategory"].value;
	var searchterm = document.forms["searchForm"]["searchterm"].value;
	message = "Both SearchCategory and Search Term is required";
	
	if(searchterm == "" | searchcategory == ""){
	
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message));

		 return false;
		}	
}

function checkAndDisplayCreateValidationErrors() {
    $('#errorMessages').empty();
    
    var title = document.forms["addForm"]["createTitle"].value;
	var  year = document.forms["addForm"]["createReleaseYear"].value;
	message1 = "Title is required";
	message2 = "Year should have 4 digits";
	
	if(title == ""){
	
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message1));

		 return false;
		}
		
	if(year == "" || isNaN(year)|| year.length > 4 ||year.length< 4){
	
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message2));

		 return false;
		}	
		
}

function checkAndDisplayEditValidationErrors() {
    $('#errorMessages').empty();
    
    var title = document.forms["editForm"]["editTitle"].value;
	var  year = document.forms["editForm"]["editReleaseYear"].value;
	message1 = "Title is required";
	message2 = "Year should have 4 digits";
	
	if(title == ""){
	
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message1));

		 return false;
		}
		
	if(year == "" || isNaN(year)|| year.length > 4 ||year.length< 4){
	
            $('#errorMessages').append($('<li>').attr({class: 'list-group-item list-group-item-danger'}).text(message2));

		 return false;
		}	
		
}

