module Jekyll
  class ObsidianLinkPreprocessor < Generator
    safe true
    priority :low

    def generate(site)
      documents = site.posts.docs + site.pages

      documents.each do |doc|
        next unless doc.output_ext == ".html" || doc.output_ext == ".md"
        
        content = doc.content
        # Replace [[Note]] with [Note](note.html)
        content.gsub!(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/) do
          target, section, alias_text = $1, $2, $3

          link_text = alias_text || section || target
          url = Utils.slugify(target) + ".html"
          url += "#" + Utils.slugify(section) if section

          "[#{link_text}](#{url})"
        end

        doc.content = content
      end
    end
  end
end