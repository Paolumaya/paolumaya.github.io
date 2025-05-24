module Jekyll
  class ObsidianLinkPreprocessor < Generator
    safe true
    priority :low

    def generate(site)
      documents = site.collections.flat_map { |_, coll| coll.docs }

      documents.each do |doc|
        puts documents
        next unless doc.extname == ".md" || doc.extname == ".markdown"

        content = doc.content.dup

        content = exclude_code_blocks(content) do |text|
          process_obsidian_markup(text)
        end

        doc.content = content
      end
    end

    private

    def process_obsidian_markup(content)
      # Process embeds like ![[note or image]]
      content.gsub!(/!\[\[([^\]]+)\]\]/) do
        target = $1.strip

        if image_extension?(target)
          alt_text = File.basename(target, '.*')
          "![#{alt_text}](#{obsidian_to_url(target)})"
        else
          "<iframe src=\"#{obsidian_to_url(target)}\" class=\"embed-note\"></iframe>"
        end
      end

      # Process internal links like [[Note]], [[Note#Section|Alias]]
      content.gsub!(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/) do
        target, heading, alias_text = $1.strip, $2&.strip, $3&.strip
        link_text = alias_text || heading || File.basename(target)

        "[#{link_text}](#{obsidian_to_url(target, heading)})"
      end

      content
    end

    def obsidian_to_url(path, heading = nil)
      slugged = path.split("/").map { |p| Jekyll::Utils.slugify(p) }.join("/")
      url = "/lore/#{slugged}/"
      url += "##{Jekyll::Utils.slugify(heading)}" if heading
      url
    end

    def image_extension?(filename)
      ext = File.extname(filename).downcase
      %w[.png .jpg .jpeg .gif .svg .webp].include?(ext)
    end

    def exclude_code_blocks(content)
      segments = content.split(/(```.*?```)/m)
      segments.map!.with_index do |seg, i|
        i.even? ? yield(seg) : seg
      end
      segments.join
    end
  end
end