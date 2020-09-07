<html>

<head>
</head>

<body>
	<p>$_REQUEST：</p>
	<pre>
		<?php
		var_dump( $_REQUEST )
		?>
	</pre>

	<p>$_GET：</p>
	<pre>
		<?php
		var_dump( $_GET )
		?>
	</pre>

	<p>$_POST：</p>
	<pre>
		<?php
		var_dump( $_POST )
		?>
	</pre>
	
	<p>$_FILES：</p>
	<pre>
		<?php
		var_dump( $_FILES )
		?>
	</pre>
	
	<p>json_decode(file_get_contents('php://input'))：</p>
	<pre>
		<?php
		var_dump( json_decode(file_get_contents('php://input')) )
		?>
	</pre>
	
</body>

</html>