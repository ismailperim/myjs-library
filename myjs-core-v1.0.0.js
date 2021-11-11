/**
 * @author Ýsmail Perim <http://ismailperim.net> <ismailperim@gmail.com>
 * @copyright 2009 © Ýsmail Perim <http://ismailperim.net> <ismailperim@gmail.com>
 * @license Licensed under the GNU General Public License, version 2. 
 * @license the file http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt
 * @version $Id: myjs-core.js  2009-12-29 01:30$
 **/


var MyJS = function(q) 
{
    /**
     * MyJS Function Overload 
     * @param object q
     **/
    q = q || '*';  
    
    
    /**
     * MyJS Selected Element List 
     * @var array elements[]
     **/
     this.elements = new Array();
     
     
     /**
      * Temp Variables Property
      * @var object temp
      **/
     this.temp = {query:null};
     
     
     /**
      * Version Of MyJS
      * @var string version
      **/
     this.version = '1.0.0';
     
     
     
     ////////////////////////////////////////////////////////////////////////////
     //                  Start Of Simple Find Functions                        // 
     ////////////////////////////////////////////////////////////////////////////
     
     
     /**
      * MyJS Query Term Chars
      * @var array terms[]
      **/
     this.terms = new Array('#','.','[','(');
     
     
     /**
      * MyJS Query Term Functions
      * @param array termFunctions
      **/
     this.termFunctions = new Array('findIdFunction','findClassFunction','findPropFunction','findFunctionFunction'); 
      
     
     /**
      * Find Id Function termFunctions[0]
      **/
     this.findIdFunction = function()
     {
        this.elements.push(document.getElementById(this.temp.query.split(this.terms[0])[1]));
        this.temp.query = null;
     }; 
        
      
     /**
      * Find Class Function termFunctions[1]
      **/
     this.findClassFunction = function()
     {
       var find = null;        
       if(this.temp.query.indexOf(this.terms[1]) == 0) // If not contains html tag
       {
           find = document.getElementsByTagName('*');
       }
       else
       {
           find = document.getElementsByTagName(this.temp.query.split(this.terms[1])[0].toUpperCase());
       }
        
       for(var i = 0;i<find.length;i++)
       {
           if(find[i].className == this.temp.query.split(this.terms[1])[1])
           {
               this.elements.push(find[i]);
           }
       }
        
        this.temp.query = null;
      }
       
      
      /**
       * Find Prop Function termFunctions[2]
       **/
      this.findPropFunction = function()
      {
        if(this.temp.query.indexOf(this.terms[2]) == 0)
        {
            var findElements = document.getElementsByTagName('*');
            for(var i = 0;i<findElements.length;i++)
            {
                var prop = this.temp.query.toString().split('=')[0];
                prop = prop.substr(1,prop.length);
                               
                var val = this.temp.query.toString().split('=')[1];
                val = val.substr(0,val.length-1);
                
                
                
                if(findElements[i].attributes[prop] != undefined)
                {
                    if(findElements[i].attributes[prop].value == val)
                    {
                        this.elements.push(findElements[i]);
                    }
                }
               
               
                
            }
        }
        else
        {
            
            var findElements = document.getElementsByTagName(this.temp.query.split(this.terms[2])[0]);
            this.temp.query = this.temp.query.substr(this.temp.query.indexOf(this.terms[2]),this.temp.query.length);
            for(var i = 0;i<findElements.length;i++)
            {
                var prop = this.temp.query.toString().split('=')[0];
                prop = prop.substr(1,prop.length);
                
                var val = this.temp.query.toString().split('=')[1];
                val = val.substr(0,val.length-1);
                
                if(findElements[i].attributes[prop].value == val)
                {
                    this.elements.push(findElements[i]);
                }
                
            }
        }
        
      }
          
     ////////////////////////////////////////////////////////////////////////////
     //                  # End Of Simple Find Functions #                      // 
     ////////////////////////////////////////////////////////////////////////////
     
      
             
     /**
      * Select Method For Constructor (Multi Query)
      * @param string query
      **/
     this.selectElement = function(query)
     {
        
        if((typeof query).toString() != 'string') // If Element Is Object or Element Is Not Query 
        {
            if(this.isArray(query))
            {
                for(var i = 0;i<query.length;i++)
                {
                    this.elements.push(query[i]);
                }
            }
            else
            {
                this.elements.push(query);
            }
        }
        else // If Element Is Query
        {
            if(query.indexOf(' ') != -1 || query.indexOf(',') != -1) // If Element Is Multi 
            {
                if(query.indexOf(' ') != -1)
                {
                    var splittedQuery = query.split(' ');
                    for(var i = 0;i<splittedQuery.length;i++)
                    {
                        this.findItems(splittedQuery[i]);
                    }
                }
                else
                {
                   var splittedQuery = query.split(',');
                   var loopFind = false;
                   var count = 0;
                   var elemTmps = new Array(document);
                   var elemTmps2 = new Array();
                   for(var count = 0;count<splittedQuery.length;count++)
                   {
                      for(var i = 0;i<elemTmps.length;i++)
                      {
                        var find = elemTmps[i].getElementsByTagName(splittedQuery[count]);
                        
                        if(find.length > 0)
                        {
                           for(var g = 0;g<find.length;g++)
                           {
                                elemTmps2.push(find[g]);  
                           }
                           
                           loopFind  = true;  
                        }  
                        
                      }
                      if(loopFind)
                      {
                        elemTmps = null;
                        elemTmps = new Array();
                        for(var i = 0;i<elemTmps2.length;i++)
                        {
                            elemTmps.push(elemTmps2[i]);    
                        }
                        
                        elemTmps2 = null;
                        elemTmps2 = new Array();
                        loopFind = false;
                      }                        
                   }
                   for(var i = 0;i<elemTmps.length;i++)
                   {
                        this.elements.push(elemTmps[i]);  
                   }
                   
                }                
            }
            else
            {
                this.findItems(query);
            }
        }   
     };
     
     
     /**
      * Find Items Main Function (Single Query)
      * @param string query
      **/
     this.findItems = function(query)
     {
        var isOnlyTag = true;
        for(var i = 0;i<this.terms.length;i++)
        {
            if(query.indexOf(this.terms[i]) != -1)
            {
               this.temp.query = query; 
               eval('this.'+this.termFunctions[i]+'()');
               isOnlyTag = false;
               break;
            }
        }
        if(isOnlyTag)
        {
            var tagElements = document.getElementsByTagName(query);
            for(var i = 0;i<tagElements.length;i++)
            {
                this.elements.push(tagElements[i]);
            }
        }
     } 
      
     
     /**
      * Param Is Array
      * @param object p
      * @return bool
      **/
    this.isArray = function (p)
    {
        if(p.length == undefined || (typeof p).toString() == 'string')
	    {
		  return false;
        }
	    else
	    {
	       return true;
	    }
    } 
    
     
    /**
     * Calls Select Method With Constructor Param
     * @param string query
     **/
     this.selectElement(q);              
       
       
    /**
     * Returns instance of MyJS
     **/
    if (this instanceof MyJS)
    {  
         return this.MyJS;  
    }
    else
    {  
         return new MyJS(q);  
    } 
    
};

////////////////////////////////////////////////////////////////////////////
//                      Start Of Core Methods                             // 
////////////////////////////////////////////////////////////////////////////
/**
 * Sets Selected Objects Style With Value
 * @param string prop
 * @param string value
 * @return instanceof MyJS
 **/
MyJS.prototype.changeStyle = function(prop,value)
{
    for(var i = 0;i<this.elements.length;i++)
    {
        this.elements[i].style[prop] = value;    
    }    
         
    return this;
};


/**
 * Sets Selected Objects innerHTML
 * @param string val
 **/
MyJS.prototype.setHtml = function(val)
{
    for(var i = 0;i<this.elements.length;i++)
    {
        this.elements[i].innerHTML = val;    
    }    
         
    return this;
};


/**
 * Sets Selected Element Event Function
 * @param string eventName Event Name (Not Contains 'on' Prefix)
 * @param object eventFunction Event Function 
 **/ 
MyJS.prototype.setEvent = function(eventName,eventFunction)
{
    for(var i = 0;i<this.elements.length;i++)
    {  
        if(document.all)
        {
            this.elements[i].attachEvent('on'+eventName,eventFunction);
        }
        else
        {
            this.elements[i].addEventListener(eventName,eventFunction,false);
        }
    }
       
    return this;
};


/**
 * Calls Selected Element Event
 * @param string eventName Event Name (Not Contains 'on' Prefix)
 **/
MyJS.prototype.callEvent = function(eventName)
{
    for(var i = 0;i<this.elements.length;i++)
    {  
        if(document.all)
        {
            this.elements[i].fireEvent('on'+eventName);
        }
        else
        {
            var newEvent = document.createEvent("MouseEvents");
            newEvent.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            this.elements[i].dispatchEvent(newEvent);
        }
    } 
   
    return this;
};