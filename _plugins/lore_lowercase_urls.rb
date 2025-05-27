# _plugins/lore_clean_urls.rb
require 'uri'

module Jekyll
  class LoreCleanUrlGenerator < Generator
    safe true
    priority :low

    def generate(site)
      lore_docs = site.collections["lore"]&.docs || []

      url_map = {}

      # Step 1: Assign lowercase, clean permalinks
      lore_docs.each do |doc|
        relative_path = doc.relative_path.sub(%r!^_lore/!, '').sub(/\.md$/, '')

        slug_path = relative_path.split('/').map { |part| slugify(part) }.join('/')
        permalink = "/lore/#{slug_path}/"

        doc.data['permalink'] = permalink
        url_map[relative_path] = slug_path

        puts "Set permalink for #{relative_path} -> #{permalink}"
      end

      # Step 2: Update markdown content with cleaned links
      lore_docs.each do |doc|
        content = doc.content
        updated = false

        url_map.each do |original_path, cleaned_path|
          pattern = /\((#{Regexp.escape(original_path)})\)/
          replacement = "(#{cleaned_path})"

          if content.match?(pattern)
            content.gsub!(pattern, replacement)
            updated = true
            puts "Updated link in #{doc.relative_path}: #{original_path} -> #{cleaned_path}"
          end
        end

        doc.content = content if updated
      end
    end

    private

    # Slugify path segments to be URL-safe
    def slugify(str)
      str.downcase
         .gsub(/[^a-z0-9\/]+/, '-')   # Replace unsafe characters with hyphen
         .gsub(/-{2,}/, '-')          # Collapse multiple hyphens
         .gsub(/(^-|-$)/, '')         # Trim leading/trailing hyphens
    end
  end
end