module Jekyll
  class LowercaseLoreUrls < Generator
    safe true
    priority :low

    def generate(site)
      # Only apply to your `lore` collection
      if site.collections["lore"]
        site.collections["lore"].docs.each do |doc|
          next if doc.data['permalink'] # don't override if you already set it manually

          # Remove the folder and extension, get path like: Characters/Kinich Ahau
          relative_path = doc.relative_path.sub(/^_lore\//, '').sub(/\.md$/, '')

          # Make each folder and filename lowercase and slug-like
          slug_path = relative_path.split('/').map { |p| Jekyll::Utils.slugify(p) }.join('/')

          # Set the permalink (URL path) that Jekyll will use
          doc.data['permalink'] = "/lore/#{slug_path}/"
        end
      end
    end
  end
end