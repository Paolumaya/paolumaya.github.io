# _plugins/lore_nav_tree.rb
module Jekyll
    class LoreNavTreeGenerator < Generator
      safe true
      priority :low
  
      def generate(site)
        lore_docs = site.collections["lore"]&.docs || []
        
        # Whitelist config (in _config.yml)
        whitelist = site.config.dig("lore_nav", "whitelist") || []
  
        tree = {}
  
        lore_docs.each do |doc|
          relative_path = doc.relative_path.sub(%r!^_lore/!, '').sub(/\.md$/, '')
          parts = relative_path.split('/').map { |p| slugify(p) }
  
          next if !whitelist.empty? && !in_whitelist?(parts, whitelist)
  
          add_to_tree(tree, parts, doc)
        end
  
        site.data["lore_tree"] = tree
      end
  
      private
  
      def slugify(str)
        str.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')
      end
  
      def in_whitelist?(parts, whitelist)
        whitelist.any? { |w| parts.join('/').start_with?(w.downcase) }
      end
  
      def add_to_tree(tree, parts, doc)
        current = tree
        parts.each_with_index do |part, i|
          current[part] ||= {}
          if i == parts.length - 1
            current[part]["__doc"] = {
              "title" => doc.data["title"].gsub(/\w+/) do |word| word.capitalize end,
              "url" => doc.url
            }
            puts current[part]["__doc"]["title"]
          else
            current = current[part]
          end
        end
      end
    end
  end