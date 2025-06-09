# Write a simple grep that will print the lines of a file having any occurrences
# of a phrase anywhere in that line. You will need to do a simple regular
# expression match and read lines from a file. (This is surprisingly simple
# in Ruby.) If you want, include line numbers.

filename = 'roses.txt'
file = open(filename, 'r')
file_size = File.size(filename)

phrase = 'and so are you'

line_number = 1
regexp = Regexp.new(phrase, 'i')

while file.pos != file_size
  line = file.readline
  puts "#{line_number}: #{line}" if regexp.match(line)
  line_number = line_number + 1
end
