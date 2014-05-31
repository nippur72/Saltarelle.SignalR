using System;
using System.Collections.Generic;
using System.Web;
using System.IO;
using System.Threading;

public static class NoCacheExtension
{    
   public static string NoCacheJavaScript(this System.Web.UI.Page page, string fileName)
   {
      return NoCache(page, fileName,"<script type='text/javascript' src='{0}'></script>");
   }
                                          
   private static string NoCache(this System.Web.UI.Page page, string fileName, string template)
   {
      string cacheBreaker = null;

      if(fileName.StartsWith("~"))
      {                              
         fileName = fileName.Substring(1);         
         string path = Path.Combine(HttpRuntime.AppDomainAppPath,fileName);
         cacheBreaker = File.GetLastWriteTime(path).ToFileTime().ToString();         
      }
      else 
      {
         cacheBreaker = File.GetLastWriteTime(fileName).ToFileTime().ToString();
      }

      if(cacheBreaker=="0") throw new FileNotFoundException(fileName);

      string final = string.IsNullOrEmpty(cacheBreaker) ? string.Empty : string.Format("/{0}?cachebreaker={1}", fileName, cacheBreaker);

      return string.Format(template,final);
   }                            
}                                               


