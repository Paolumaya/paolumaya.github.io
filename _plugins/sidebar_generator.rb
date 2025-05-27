module Jekyll
    class SidebarGenerator < Generator
      safe true
      priority :low
  
      def generate(site)
        site.data['sidebar_groups'] = {}
        site.collections['lore'].docs.each do |page|
          if page.path.include?('_lore') && page.path.end_with?('.md')
            title = page.data['title'] || page.title
            page.data['title'] = page.data['title'].gsub(/\w+/) do |word| word.capitalize end
            url = page.url
            folder = page.relative_path.split('/')
            # puts folder
            if folder.length > 2 
                site.data['sidebar_groups'][folder[1]] ||= []
                site.data['sidebar_groups'][folder[1]] << { 'title' => title.gsub(/\w+/) do |word| word.capitalize end, 'url' => url }
            else
                site.data['sidebar_groups']["Root"] ||= []
                site.data['sidebar_groups']["Root"] << { 'title' => title.gsub(/\w+/) do |word| word.capitalize end, 'url' => url }
            end
          end
        end
        # puts "hmm"
        # puts site.data['sidebar_links']
        # puts "okay"
      end
    end
  end
  