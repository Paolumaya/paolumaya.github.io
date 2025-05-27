# _plugins/dynamic_content.rb
module Jekyll
    class DynamicContentGenerator < Generator
      safe true
      priority :high
  
      def generate(site)
        site.collections["lore"]&.docs.each do |page|
          # Apply themes or sidebars based on the page path
        puts page.relative_path
        page.data["layout"] = "post"
        # page.data["theme"] = site.theme
        page.data["sidebar"] = "sidebar.html"
        end
      end
    end
  end
  