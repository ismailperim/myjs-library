/**
 * @author Ýsmail Perim <http://ismailperim.net> <ismailperim@gmail.com>
 * @copyright 2009 © Ýsmail Perim <http://ismailperim.net> <ismailperim@gmail.com>
 * @license Licensed under the GNU General Public License, version 2. 
 * @license the file http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt
 * @version $Id: myjs-ajax.js  2009-12-29 01:30$
 **/

 
/**
 * MyJS Ajax Function
 * @param string url
 * @param string type
 * @return instanceof MyJS
 **/ 
MyJS.prototype.ajax = function(url,type,opts)
{ 
    if(url != null && url != '' && (type == 'GET' || type == 'POST'))
    {
       var req = new AjaxRequestObject();
       if(req) 
       {
	       req.onreadystatechange = function () {};
	       req.abort();
	   }
       
       if(opts.encode)
       {
            var dataEncode = opts.data;
            var dataArray = dataEncode.split('&');
            opts.data = '';
            for(var i = 0;i<dataArray.length;i++)
            {
                var dataValue = dataArray[i].split('=');
                opts.data += dataValue[0] + '=' + encodeURIComponent(dataValue[1]);
                if(i<dataArray.length-1)
                {
                    opts.data += '&';
                } 
            }
            
       }
       
       if(type == 'GET')
       {
            url = url + '?' + opts.data;
       }
       req.onreadystatechange = function () 
       {
            if(req.readyState == 1 || req.readyState == 2 || req.readyState == 3) 
            {
                if(opts.loading != 'undefined')
                {
                    opts.loading();
                }
            }else if(req.readyState == 4 && req.status == 200)
            {
                if(opts.success != 'undefined')
                {
                    opts.success(req.responseText);
                }
            }
       }
	   req.open(type, url, true);
	   req.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
	   if(type == 'POST')
       {
           req.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=iso-8859-9');
       }
       req.setRequestHeader("Content-length", opts.data.length);
       req.setRequestHeader("Connection", "close");
	   if(type == 'POST')
       {
            req.send(opts.data);  
       }
       else
       {
            req.send(null);
       }
       
        
    }
};



function AjaxRequestObject() 
{
   var ajax = false;
   
   
   try 
   {
     ajax = new ActiveXObject("Msxml2.XMLHTTP"); 
   } 
   catch(e)
   {
	   
      try 
      {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e) 
      {
        ajax = false;
      }

   }

   
   if ( !ajax && typeof XMLHttpRequest != 'undefined' ) 
   {
     try
     {
        ajax = new XMLHttpRequest();
     }
     catch(e) 
     {    
        ajax = false;
     }

   }


   if ( !ajax && window.createRequest ) 
   {
	 try
     {
        ajax = window.createRequest();
     }
     catch(e) 
     {  
        ajax = false;
     }

   }

	return ajax;
}

