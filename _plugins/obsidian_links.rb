# _plugins/obsidian_links.rb
module Jekyll
  class ObsidianLinkPreprocessor < Generator
    safe true
    priority :low

    def generate(site)
      documents = site.pages + site.posts.docs + site.collections.flat_map { |_, coll| coll.docs }

      documents.each do |doc|
        next unless doc.extname == ".md" || doc.extname == ".markdown"

        content = doc.content.dup

        # Skip inside code blocks
        content = exclude_code_blocks(content) do |text|
          process_obsidian_markup(text)
        end

        doc.content = content
      end
    end

    private

    def process_obsidian_markup(content)
      # Process embedded notes or images
      content.gsub!(/!\[\[([^\]]+)\]\]/) do
        target = $1.strip

        if image_extension?(target)
          # Image embed: ![[image.png]]
          src = slugify_path(target)
          "![#{File.basename(target, '.*')}](#{src})"
        else
          # Note embed: ![[Note]] → render as iframe or styled blockquote
          file = slugify_path(target) + ".html"
          "<iframe src=\"#{file}\" class=\"embed-note\"></iframe>"
        end
      end

      # Process normal Obsidian links: [[Note]], [[Note#Section|Alias]]
      content.gsub!(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/) do
        target, heading, alias_text = $1.strip, $2&.strip, $3&.strip
        link_text = alias_text || heading || File.basename(target)

        url = slugify_path(target) + ".html"
        url += "#" + Jekyll::Utils.slugify(heading) if heading

        "[#{link_text}](#{url})"
      end

      content
    end

    def slugify_path(path)
      parts = path.split("/")
      parts.map { |p| Jekyll::Utils.slugify(p) }.join("/")
    end

    def image_extension?(filename)
      ext = File.extname(filename).downcase
      [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].include?(ext)
    end

    def exclude_code_blocks(content)
      segments = content.split(/(```.*?```)/m)
      segments.map!.with_index do |seg, i|
        if i.even?
          yield(seg) # only process non-code segments
        else
          seg # untouched code block
        end
      end
      segments.join
    end
  end
end
