require 'jekyll'
require 'kramdown'

  class Jekyll::Converters::Markdown::ObsidianConverter
    safe true
    priority :high

    def matches(ext)
      ext.downcase == ".md"
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      content2 = preprocess_obsidian(content)
      Kramdown::Document.new(content2).to_html
    end

    private

    def preprocess_obsidian(content)
      # Convert [[Internal Links]] to <a href="/internal-links">Internal Links</a>
      content.gsub!(/\[\[([^\]|]+)\|?([^\]]+)?\]\]/g) do
        target = Regexp.last_match(1).strip
        alias_text = Regexp.last_match(3) || target
        href = "/#{target.downcase.strip.gsub(' ', '-')}"
        "<a href=\"#{href}\">#{alias_text}</a>"
      end

      # Convert ![[Embedded.png]] to <img src="/assets/Embedded.png">
      content.gsub!(/!\[\[([^\]]+)\]\]/) do
        src = Regexp.last_match(1).strip
        "<img src=\"/assets/#{src}\" alt=\"#{src}\">"
      end

      # Convert #tags to <span class="tag">#tag</span>
      content.gsub!(/(?<!\w)#(\w[\w-]*)/) do
        tag = Regexp.last_match(1)
        "<span class=\"tag\">##{tag}</span>"
      end

      # Convert > [!NOTE] style callouts to blockquote with class
      content.gsub!(/^> \[!(\w+)\](.*)/) do
        type = Regexp.last_match(1).downcase
        text = Regexp.last_match(2).strip
        "<blockquote class=\"callout #{type}\"><strong>#{type.capitalize}:</strong> #{text}</blockquote>"
      end

      content
    end
  end
