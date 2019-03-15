			$('#uploadForm').submit(function(e) {	
				if($('#fileToUpload').val()) {
					$(this).ajaxSubmit({ 
						beforeSubmit: function() {
							$("#progress-bar").width('0%');
						},
						uploadProgress: function (event, position, total, percentComplete){	
							$("#progress-bar").width(percentComplete + '%');
							$("#progress-bar").html('<div id="progress-status">' + percentComplete +' %</div>')
						},
						success:function (){
					
						},
						resetForm: true 
					}); 
				}
			}); 

			$(window).on('load', function() {
				$(".se-pre-con").fadeOut("slow");
			});

			function getId(id) {
				return document.getElementById(id);
			}

			function validation() {
				getId("submit_btn").style.display="none";
				getId("wait_tip").style.display="";
				return true;
			}